import './TablePage.scss';
import { useEffect, useState, useCallback } from 'react';
import * as api from '../../api/instock-api';
import TableHeader from '../../components/TableHeader/TableHeader';
import InventoryTableRow from '../../components/InventoryTableRow/InventoryTableRow';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import WarehouseTableRow from '../../components/WarehouseTableRow/WarehouseTableRow';

function TablePage({ page }) {
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState('');

  const inventoryHeaders = [
    'INVENTORY ITEM',
    'CATEGORY',
    'STATUS',
    'QTY',
    'WAREHOUSE',
    'ACTIONS',
  ];

  const warehouseHeaders = [
    'WAREHOUSE',
    'ADDRESS',
    'CONTACT NAME',
    'CONTACT INFORMATION',
    'ACTIONS',
  ];

  useEffect(() => {
    const loadTableData = async () => {
      setTableData([]);
      let data = [];
      if (page === 'warehouses') {
        data = await api.getWarehouses();
      } else if (page === 'inventory') {
        data = await api.getInventories();
      }
      setTableData(data);
    };
    loadTableData();
  }, [page]);

  const handleClick = useCallback(
    async (id) => {
      if (page === 'warehouses') {
        await api.deleteWarehouse(id);
        setTableData(await api.getWarehouses());
      } else if (page === 'inventory') {
        await api.deleteInventoryItem(id);
        setTableData(await api.getInventories());
      }
    },
    [page]
  );
  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const filteredData = tableData.filter((data) => {
    const keyword = search.toLowerCase();

    if (page === 'warehouses') {
      return (
        (data.warehouse_name &&
          data.warehouse_name.toLowerCase().includes(keyword)) ||
        (data.address && data.address.toLowerCase().includes(keyword)) ||
        (data.contact_name &&
          data.contact_name.toLowerCase().includes(keyword)) ||
        (data.contact_phone &&
          data.contact_phone.toLowerCase().includes(keyword)) ||
        (data.contact_email &&
          data.contact_email.toLowerCase().includes(keyword))
      );
    } else if (page === 'inventory') {
      return (
        (data.item_name && data.item_name.toLowerCase().includes(keyword)) ||
        (data.category && data.category.toLowerCase().includes(keyword)) ||
        (data.warehouse_name &&
          data.warehouse_name.toLowerCase().includes(keyword)) ||
        (data.status && data.status.toLowerCase().includes(keyword))
      );
    }
    return false;
  });

  return (
    <section className="inventory-table">
      <div className="inventory-table__header-container">
        <h1 className="inventory-table__title">
          {page === 'warehouses' ? 'Warehouses' : 'Inventory'}
        </h1>
        <form action="submit" className="inventory-table__search">
          <input
            type="text"
            placeholder="Search.."
            className="inventory-table__search-input"
            onChange={handleChange}
          />
        </form>
        <Link
          to={page === 'warehouses' ? '/warehouses/add' : '/inventory/add'}
          className="inventory-table__button"
        >
          {page === 'warehouses' ? '+ Add New Warehouse' : '+ Add New Item'}
        </Link>
      </div>

      <TableHeader
        headers={page === 'warehouses' ? warehouseHeaders : inventoryHeaders}
      />
      <ul className="inventory-table__list">
        {page === 'warehouses' &&
          (filteredData.length > 0 ? filteredData : tableData).map((data) => (
            <li key={data.id}>
              <WarehouseTableRow
                warehouseInfo={data}
                handleClick={handleClick}
              />
            </li>
          ))}
        {page === 'inventory' &&
          (filteredData.length > 0 ? filteredData : tableData).map((data) => (
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
