import { useEffect, useState, useCallback } from "react";
import * as api from "../../api/instock-api";
import TableHeader from "../../components/TableHeader/TableHeader";
import InventoryTableRow from "../../components/InventoryTableRow/InventoryTableRow";
import { Link } from "react-router-dom";
import "./TablePage.scss";
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
    const loadTableData = async (page) => {
      if (page === "warehouses") {
        setTableData(await api.getWarehouses());
      }

      if (page === "inventory") {
        setTableData(await api.getInventories());
      }
    };
    loadTableData(page);
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
        <Link to="/inventory/add" className="inventory-table__button">
          {page === "warehouses" ? "+ Add New Warehouse" : "+ Add New Item"}
        </Link>
      </div>

      <TableHeader
        headers={page === "warehouses" ? warehouseHeaders : inventoryHeaders}
      />
      <ul className="inventory-table__list">
        {page === "warehousese" &&
          tableData.map((data) => (
            <li key={data.id}>
              <WarehouseTableRow
                inventoryInfo={data}
                handleClick={handleClick}
              />
            </li>
          ))}
        {page === "inventory" &&
          tableData.map((data) => (
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
