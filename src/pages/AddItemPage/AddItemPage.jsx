import React from 'react';
import './AddItemPage.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import backArrow from '../../assets/Icons/arrow_back-24px.svg'
import * as api from "../../api/instock-api";


function AddItemPage() {

  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [formData, setFormData] = useState({
    warehouse_id: '',
    item_name: '',
    description: '',
    category: '',
    status: 'In Stock',
    quantity: '0'
  });

  const categories = ['Electronics', 'Gear', 'Apparel', 'Accessories', 'Health'];

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const warehouseData = await api.getWarehouses();
        console.log(warehouseData);

        setWarehouses(warehouseData.data.warehouse_name);
      } catch (error) {
        alert('Failed to load warehouses');
      }
    };
    fetchWarehouses();
  }, []);  // maybe pass as props instead of calling here ...we maybe only need the warehouse_name

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const validateForm = () => {
    if (!formData.warehouse_id || !formData.item_name || !formData.description || !formData.category) {
      alert("Please fill in all required fields");
      return false;
    }

    if (isNaN(parseInt(formData.warehouse_id))) {
      alert("Invalid warehouse ID");
      return false;
    }

    if (formData.status === "In Stock") {
      if (isNaN(formData.quantity) || parseInt(formData.quantity) < 0) {
        alert("Please enter a valid quantity");
        return false;
      }
    }

    return true;
  };

  const formatDataForApi = () => ({
    ...formData,
    warehouse_id: parseInt(formData.warehouse_id),
    quantity: formData.status === 'Out of Stock' ? 0 : parseInt(formData.quantity)
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const formattedData = formatDataForApi();
      await api.addInventoryItem(formattedData);
      navigate('/inventory');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="add-item">
      <div className="add-item__header">
        <img
          src={backArrow}
          alt="Back Arrow"
          className="add-item__header-arrow"
          onClick={() => navigate(-1)}
        />
        <h1 className="add-item__header-title">Add New Inventory Item</h1>
      </div>
      <form onSubmit={handleSubmit} className="add-item__form">
        <div className="add-item__container">
        <div className="add-item__details">
          <h2 className="add-item__details-title">Item Details</h2>

          <div className="add-item__field">
            <label className="add-item__label">
              Item Name
            </label>
            <input
              type="text"
              name="item_name"
              placeholder="Item Name"
              className="add-item__input"
              value={formData.item_name}
              onChange={handleChange}
            />
          </div>
          <div className="add-item__field">
            <label className="add-item__label">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Please enter a brief item description..."
              className="add-item__input add-item__input--textarea"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="add-item__field">
            <label className="add-item__label">
              Category
            </label>
            <select
              name="category"
              className="add-item__input add-item__input--select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Please select</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="add-item__availability">
          <h2 className="add-item__availability-title">Item Availability</h2>

          <div className="add-item__field">
            <label className="add-item__label">Status</label>
            <div className="add-item__status">
              <div className="add-item__radio-wrapper">
                <input
                  type="radio"
                  id="inStock"
                  name="status"
                  value="In Stock"
                  checked={formData.status === "In Stock"}
                  onChange={handleChange}
                  className="add-item__radio"
                />
                <label htmlFor="inStock" className="add-item__radio-label">
                  In stock
                </label>
              </div>
              <div className="add-item__radio-wrapper">
                <input
                  type="radio"
                  id="outOfStock"
                  name="status"
                  value="Out of Stock"
                  checked={formData.status === "Out of Stock"}
                  onChange={handleChange}
                  className="add-item__radio"
                />
                <label htmlFor="outOfStock" className="add-item__radio-label">
                  Out of stock
                </label>
              </div>
            </div>
          </div>
          {formData.status === "In Stock" && (
            <div className="add-item__field">
              <label className="add-item__label">Quantity</label>
              <input
                type="number"
                name="quantity"
                placeholder="0"
                className={`add-item__input`}
                value={formData.quantity}
                onChange={handleChange}
                min="0"
              />
            </div>
          )}

          <div className="add-item__field">
            <label className="add-item__label">Warehouse</label>
            <select
              name="warehouse_id"
              className={`add-item__input add-item__input--select`}
              value={formData.warehouse_id}
              onChange={handleChange}
            >
              <option value="">Please select</option>
              {warehouses.map(warehouse => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        </div> 
      <div className="add-item__actions">
        <button
          type="button"
          className="add-item__button add-item__button--secondary"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="add-item__button add-item__button--primary"
        >
          + Add Item
        </button>
      </div>
      </form>
    </div>
  );
}

export default AddItemPage
