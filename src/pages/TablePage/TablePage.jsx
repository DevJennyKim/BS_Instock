import "./TablePage.scss";
import { useEffect, useState, useCallback } from "react";
import * as api from "../../api/instock-api";
import TableHeader from "../../components/TableHeader/TableHeader";
import InventoryTableRow from "../../components/InventoryTableRow/InventoryTableRow";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import WarehouseTableRow from "../../components/WarehouseTableRow/WarehouseTableRow";

function TablePage({ page }) {
  const [tableData, setTableData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);

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

  const loadData = async (endpoint) => {
    const data = await endpoint();
    setTableData(data);
  };

  useEffect(() => {
    const loadTableData = async () => {
      if (page === "warehouses") {
        loadData(api.getWarehouses);
      } else if (page === "inventory") {
        loadData(api.getInventories);
      }
    };
    loadTableData();
  }, [page]);

  const handleDelete = useCallback(
    async (id) => {
      if (page === "warehouses") {
        await api.deleteWarehouse(id);
        loadData(api.getWarehouses);
      } else if (page === "inventory") {
        await api.deleteInventoryItem(id);
        loadData(api.getInventories);
      }
    },
    [page]
  );

  const handleSort = async (property) => {
    const newOrder = !isAscending;
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

  return (
    <section className="inventory-table">
      <div className="inventory-table__header-container">
        <h1 className="inventory-table__title">
          {page === "warehouses" ? "Warehouses" : "Inventory"}
        </h1>
        <form action="submit" className="inventory-table__search">
          <input
            type="text"
            placeholder="Search.."
            className="inventory-table__search-input"
          />
        </form>
        <Link
          to={page === "warehouses" ? "/warehouses/add" : "/inventory/add"}
          className="inventory-table__button"
        >
          {page === "warehouses" ? "+ Add New Warehouse" : "+ Add New Item"}
        </Link>
      </div>

      <TableHeader headers={headers} handleClick={handleSort} />
      <ul className="inventory-table__list">
        {page === "warehouses" &&
          tableData[0]?.address &&
          tableData?.map((data) => (
            <li key={data.id}>
              <WarehouseTableRow
                warehouseInfo={data}
                handleClick={handleDelete}
              />
            </li>
          ))}
        {page === "inventory" &&
          tableData[0]?.item_name &&
          tableData?.map((data) => (
            <li key={data.id}>
              <InventoryTableRow
                inventoryInfo={data}
                handleClick={handleDelete}
              />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default TablePage;

TablePage.propTypes = {
  page: PropTypes.string.isRequired,
};
