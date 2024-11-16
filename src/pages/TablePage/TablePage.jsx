import './TablePage.scss';
import { useEffect, useState, useCallback } from 'react';
import * as api from '../../api/instock-api';
import TableHeader from '../../components/TableHeader/TableHeader';
import InventoryTableRow from '../../components/InventoryTableRow/InventoryTableRow';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import WarehouseTableRow from '../../components/WarehouseTableRow/WarehouseTableRow';

function TablePage({ page }) {
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState('');

  const location = useLocation();

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

  const loadTableData = useCallback(
    async (searchKeyword) => {
      setTableData([]);
      let data = [];
      if (page === 'warehouses') data = await api.getWarehouses(searchKeyword);
      else if (page === 'inventory')
        data = await api.getInventories(searchKeyword);
      setTableData(data);
    },
    [page]
  );

  useEffect(() => {
    const searchKeyword = new URLSearchParams(location.search).get('s') || '';
    setSearch(searchKeyword);
    loadTableData(searchKeyword);
  }, [location.search, loadTableData]);

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
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('s', value);
    window.history.replaceState(null, '', '?' + searchParams.toString());
    loadTableData(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loadTableData(search);
  };

  const matchesKeyword = (text) => {
    const keyword = search.toLowerCase().replace(/\s+/g, '');
    const safeText = text
      ? text.toString().toLowerCase().replace(/\s+/g, '')
      : '';
    return safeText.includes(keyword);
  };

  const filteredData = tableData.filter((data) => {
    if (page === 'warehouses') {
      return (
        matchesKeyword(data.warehouse_name) ||
        matchesKeyword(data.address) ||
        matchesKeyword(data.contact_name) ||
        matchesKeyword(data.contact_phone) ||
        matchesKeyword(data.contact_email)
      );
    } else if (page === 'inventory') {
      return (
        matchesKeyword(data.item_name) ||
        matchesKeyword(data.category) ||
        matchesKeyword(data.warehouse_name) ||
        matchesKeyword(data.status) ||
        matchesKeyword(data.quantity)
      );
    }
    return false;
  });

  return (
    <section className="table">
      <div className="table__header-container">
        <h1 className="table__title">
          {page === 'warehouses' ? 'Warehouses' : 'Inventory'}
        </h1>
        <form action="submit" className="table__search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            className="table__search-input"
            onChange={handleChange}
          />
        </form>
        <Link
          to={page === 'warehouses' ? '/warehouses/add' : '/inventory/add'}
          className="table__button"
        >
          {page === 'warehouses' ? '+ Add New Warehouse' : '+ Add New Item'}
        </Link>
      </div>

      <TableHeader
        headers={page === 'warehouses' ? warehouseHeaders : inventoryHeaders}
      />
      <ul className="table__list">
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
