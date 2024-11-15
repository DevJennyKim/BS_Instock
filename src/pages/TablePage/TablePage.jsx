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

  const inventoryHeaders = [
    "INVENTORY ITEM",
    "CATEGORY",
    "STATUS",
    "QTY",
    "WAREHOUSE",
    "ACTIONS",
  ];

  const warehouseHeaders = [
    "WAREHOUSE",
    "ADDRESS",
    "CONTACT NAME",
    "CONTACT INFORMATION",
    "ACTIONS",
  ];

  useEffect(() => {
    const loadTableData = async () => {
      setTableData([]);

      let data = [];

      if (page === "warehouses") {
        data = await api.getWarehouses();
      } else if (page === "inventory") {
        data = await api.getInventories();
      }

      setTableData(data);
    };
    loadTableData();
  }, [page]);

  const handleClick = useCallback((itemId) => {
    api.deleteInventoryItem(itemId);
  }, []);

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

      <TableHeader
        headers={page === "warehouses" ? warehouseHeaders : inventoryHeaders}
      />
      <ul className="inventory-table__list">
        {page === "warehouses" &&
          tableData[0]?.address &&
          tableData?.map((data) => (
            <li key={data.id}>
              <WarehouseTableRow
                warehouseInfo={data}
                handleClick={handleClick}
              />
            </li>
          ))}
        {page === "inventory" &&
          tableData[0]?.item_name &&
          tableData?.map((data) => (
            <li key={data.id}>
              <InventoryTableRow
                inventoryInfo={data}
                handleClick={handleClick}
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
