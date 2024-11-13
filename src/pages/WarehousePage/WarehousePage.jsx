import "./WarehousePage.scss";
import * as api from "../../api/instock-api";
import WarehouseTableRow from "../../components/WarehouseTableRow/WarehouseTableRow";
import { useEffect, useState } from "react";

function WarehousePage() {
  const [warehousesList, setWarehousesList] = useState([]);

  useEffect(() => {
    const loadWarehousesList = async () => {
      setWarehousesList(await api.getWarehouses());
    };
    loadWarehousesList();
  }, [warehousesList]);

  return (
    <section className="warehouse-table">
      <div className="warehouse-table__header-container">
        <h1 className="warehouse-table__title">Warehouses</h1>
        <form action="submit" className="warehouse-table__search">
          <input
            type="text"
            placeholder="Search.."
            className="warehouse-table__search-input"
          />
        </form>
        <a href="#" className="warehouse-table__button">
          + Add New Warehouse
        </a>
      </div>
      <div className="warehouse-table__column-headers">
        <h3 className="warehouse-table__header">WAREHOUSE</h3>
        <h3 className="warehouse-table__header">ADDRESS</h3>
        <h3 className="warehouse-table__header">CONTACT NAME</h3>
        <h3 className="warehouse-table__header">CONTACT INFORMATION</h3>
        <h3 className="warehouse-table__header">ACTIONS</h3>
      </div>
      <ul className="warehouse-table__list">
        {warehousesList.map((warehouse) => (
          <li key={warehouse.id}>
            <WarehouseTableRow
              tableName="warehouse-table"
              warehouseInfo={warehouse}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default WarehousePage;
