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
      <h1 className="warehouse-table__title">Warehouses</h1>
      <form action="submit" className="warehouse-table__search">
        <input type="text" className="warehouse-table__search-input" />
      </form>
      <a href="#" className="warehouse-table__button">
        Add New Warehouse
      </a>
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
