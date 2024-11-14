import "./inventoryPage.scss";
import * as api from "../../api/instock-api";
import TableHeader from "../../components/TableHeader/TableHeader";
import InventoryTableRow from "../../components/InventoryTableRow/InventoryTableRow";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

function InventoryPage() {
  const [inventoryList, setInventoryList] = useState([]);

  const headerConfigs = [
    "INVENTORY ITEM",
    "CATEGORY",
    "STATUS",
    "QTY",
    "WAREHOUSE",
    "ACTIONS",
  ];

  useEffect(() => {
    const loadInventoryList = async () => {
      setInventoryList(await api.getInventories());
    };
    loadInventoryList();
  }, [inventoryList]);

  const handleClick = useCallback((itemId) => {
    api.deleteInventoryItem(itemId);
  }, []);

  return (
    <section className="inventory-table">
      <div className="inventory-table__header-container">
        <h1 className="inventory-table__title">Inventory</h1>
        <form action="submit" className="inventory-table__search">
          <input
            type="text"
            placeholder="Search.."
            className="inventory-table__search-input"
          />
        </form>
        <Link to="/inventory/add" className="inventory-table__button">
          + Add New Item
        </Link>
      </div>
      <TableHeader headers={headerConfigs} />
      <ul className="inventory-table__list">
        {inventoryList.map((inventory) => (
          <li key={inventory.id}>
            <InventoryTableRow
              inventoryInfo={inventory}
              handleClick={handleClick}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default InventoryPage;
