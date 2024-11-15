import "./WarehousePage.scss";
import * as api from "../../api/instock-api";
import TableHeader from "../../components/TableHeader/TableHeader";
import WarehouseTableRow from "../../components/WarehouseTableRow/WarehouseTableRow";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

function WarehousePage() {
  const [warehousesList, setWarehousesList] = useState([]);

  const headerConfigs = [
    "WAREHOUSE",
    "ADDRESS",
    "CONTACT NAME",
    "CONTACT INFORMATION",
    "ACTIONS",
  ];

  useEffect(() => {
    const loadWarehousesList = async () => {
      setWarehousesList(await api.getWarehouses());
    };
    loadWarehousesList();
  }, [warehousesList]);

  const handleClick = useCallback((warehouseId) => {
    api.deleteWarehouse(warehouseId);
  }, []);

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
        <Link to="/warehouses/add" className="warehouse-table__button">
          + Add New Warehouse
        </Link>
      </div>
      <div className="warehouse-table__column-headers">
        {headerConfigs.map((header) => (
          <TableHeader
            key={header}
            tableName="warehouse-table"
            header={header}
          />
        ))}
      </div>
      <ul className="warehouse-table__list">
        {warehousesList.map((warehouse) => (
          <li key={warehouse.id}>
            <WarehouseTableRow
              tableName="warehouse-table"
              warehouseInfo={warehouse}
              handleClick={handleClick}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default WarehousePage;
