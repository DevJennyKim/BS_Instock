import "./inventoryPage.scss";
import * as api from "../../api/instock-api";
import InventoryTableRow from "../../components/InventoryTableRow/InventoryTableRow";
import { useEffect, useState } from "react";

function InventoryPage() {
  const [inventoryList, setInventoryList] = useState([]);

  useEffect(() => {
    const loadInventoryList = async () => {
      setInventoryList(await api.getInventories());
    };
    loadInventoryList();
  }, [inventoryList]);

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
        <a href="#" className="inventory-table__button">
          + Add New Item
        </a>
      </div>
      <div className="inventory-table__column-headers">
        <h3 className="inventory-table__header">INVENTORY ITEM</h3>
        <h3 className="inventory-table__header">CATEGORY</h3>
        <h3 className="inventory-table__header">STATUS</h3>
        <h3 className="inventory-table__header">QTY</h3>
        <h3 className="inventory-table__header">WAREHOUSE</h3>
        <h3 className="inventory-table__header">ACTIONS</h3>
      </div>
      <ul className="inventory-table__list">
        {inventoryList.map((inventory) => (
          <li key={inventory.id}>
            <InventoryTableRow
              tableName="inventory-table"
              inventoryInfo={inventory}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default InventoryPage;
