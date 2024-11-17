import "./TablePage.scss";
import { useEffect, useState, useCallback, useMemo } from "react";
import * as api from "../../api/instock-api";
import TableHeader from "../../components/TableHeader/TableHeader";
import InventoryTableRow from "../../components/InventoryTableRow/InventoryTableRow";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import WarehouseTableRow from "../../components/WarehouseTableRow/WarehouseTableRow";
import debounce from "lodash.debounce";
import DeletePopup from "../../components/DeletePopup/DeletePopup";

function TablePage({ page }) {
  const location = useLocation();
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [deletedItemId, setDeletedItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedItem, setDeletedItem] = useState({});
  const [sortProperty, setSortProperty] = useState("");

  const openModal = (itemId) => {
    setIsModalOpen(true);
    setDeletedItemId(itemId);
    const foundItem = tableData.find((item) => item.id === itemId);
    setDeletedItem(foundItem);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setDeletedItemId(null);
    setDeletedItem({});
  };

  const inventoryHeaders = [
    { text: "INVENTORY ITEM", property: "item_name" },
    { text: "CATEGORY", property: "category" },
    { text: "STATUS", property: "status" },
    { text: "QTY", property: "quantity" },
    { text: "WAREHOUSE", property: "warehouse_name" },
    { text: "ACTIONS", property: "" },
  ];

  const warehouseHeaders = [
    { text: "WAREHOUSE", property: "warehouse_name" },
    { text: "ADDRESS", property: "address" },
    { text: "CONTACT NAME", property: "contact_name" },
    { text: "CONTACT INFORMATION", property: "contact_email" },
    { text: "ACTIONS", property: "" },
  ];

  const loadTableData = useCallback(
    async (searchKeyword) => {
      setTableData([]);
      let data = [];
      if (page === "warehouses") data = await api.getWarehouses(searchKeyword);
      else if (page === "inventory")
        data = await api.getInventories(searchKeyword);
      setTableData(data);
    },
    [page]
  );

  useEffect(() => {
    const searchKeyword = new URLSearchParams(location.search).get("s") || "";
    setSearch(searchKeyword);
    loadTableData(searchKeyword);
  }, [location.search, loadTableData]);

  const handleDelete = async () => {
    const order = isAscending ? "asc" : "desc";

    if (page === "warehouses") {
      await api.deleteWarehouse(deletedItemId);
      const sortedData = await api.getSortedWarehouses(sortProperty, order);
      setTableData(sortedData);
      closeModal();
    } else if (page === "inventory") {
      await api.deleteInventoryItem(deletedItemId);
      const sortedData = await api.getSortedInventories(sortProperty, order);
      setTableData(sortedData);
      closeModal();
    }
  };

  const handleSort = async (property) => {
    const newOrder = !isAscending;
    setSortProperty(property);
    setIsAscending(newOrder);
    const order = newOrder ? "asc" : "desc";

    if (page === "warehouses") {
      const sortedData = await api.getSortedWarehouses(property, order);
      setTableData(sortedData);
    }

    if (page === "inventory") {
      const sortedData = await api.getSortedInventories(property, order);
      setTableData(sortedData);
    }
  };

  const headers = page === "warehouses" ? warehouseHeaders : inventoryHeaders;
  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    debouncedLoadData(value);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("s", value);
    window.history.replaceState(null, "", "?" + searchParams.toString());
  };

  const debouncedLoadData = useMemo(
    () =>
      debounce(async (keyword) => {
        if (!keyword.trim()) {
          setTableData(
            await (page === "warehouses"
              ? api.getWarehouses()
              : api.getInventories())
          );
          return;
        }
        await loadTableData(keyword);
      }, 800),
    [page, loadTableData]
  );

  useEffect(() => {
    return () => {
      debouncedLoadData.cancel();
    };
  }, [debouncedLoadData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    loadTableData(search);
  };

  const matchesKeyword = (text) => {
    const keyword = search.toLowerCase().replace(/\s+/g, "");
    const safeText = text
      ? text.toString().toLowerCase().replace(/\s+/g, "")
      : "";
    return safeText.includes(keyword);
  };

  const filteredData = tableData.filter((data) => {
    const allValues = Object.values(data).map((value) =>
      value ? value.toString() : ""
    );
    return allValues.some((value) => matchesKeyword(value));
  });

  return (
    <section className="table">
      <div className="table__header-container">
        <h1 className="table__title">
          {page === "warehouses" ? "Warehouses" : "Inventory"}
        </h1>
        <form action="submit" className="table__search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            className="table__search-input"
            value={search}
            onChange={handleChange}
          />
        </form>
        <Link
          to={page === "warehouses" ? "/warehouses/add" : "/inventory/add"}
          className="table__button"
        >
          {page === "warehouses" ? "+ Add New Warehouse" : "+ Add New Item"}
        </Link>
      </div>

      <TableHeader headers={headers} handleClick={handleSort} />
      <ul className="table__list">
        {page === "warehouses" &&
          (filteredData.length > 0 ? filteredData : tableData).map((data) => (
            <li key={data.id}>
              <WarehouseTableRow warehouseInfo={data} handleClick={openModal} />
            </li>
          ))}
        {page === "inventory" &&
          (filteredData.length > 0 ? filteredData : tableData).map((data) => (
            <li key={data.id}>
              <InventoryTableRow inventoryInfo={data} handleClick={openModal} />
            </li>
          ))}
      </ul>
      <DeletePopup
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        title={
          page === "warehouses"
            ? `Delete ${deletedItem.warehouse_name} warehouse?`
            : `Delete ${deletedItem.item_name} inventory item?`
        }
        content={
          page === "warehouses"
            ? `Please confirm that you'd like to delete the ${deletedItem.warehouse_name} warehouse from the list of warehouses. You won't be able to undo this action.`
            : `Please confirm that you'd like to delete ${deletedItem.item_name} from the inventory list. You won't be able to undo this action.`
        }
      />
    </section>
  );
}

export default TablePage;

TablePage.propTypes = {
  page: PropTypes.string.isRequired,
};
