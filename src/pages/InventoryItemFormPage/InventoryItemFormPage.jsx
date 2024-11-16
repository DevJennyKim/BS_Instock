import './InventoryItemFormPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import backArrow from '../../assets/Icons/arrow_back-24px.svg';
import errorIcon from '../../assets/Icons/error-24px.svg';
import * as api from '../../api/instock-api';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

function InventoryItemFormPage({ action }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    warehouse_id: '',
    item_name: '',
    description: '',
    category: '',
    status: 'In Stock',
    quantity: '0',
  });

  const categories = [
    'Electronics',
    'Gear',
    'Apparel',
    'Accessories',
    'Health',
  ];

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const warehouseData = await api.getWarehouses();
        setWarehouses(warehouseData);
      } catch (error) {
        console.error('Failed to load warehouses', error);
      }
    };
    fetchWarehouses();
  }, []);

  useEffect(() => {
    if (action === 'update' && id && warehouses.length > 0) {
      const fetchInventoryItem = async () => {
        try {
          const itemData = await api.getInventoryItemById(id);
          const warehouse = warehouses.find(
            (w) => w.id === itemData.warehouse_id
          );
          setFormData({
            warehouse_id: itemData.warehouse_id,
            item_name: itemData.item_name,
            description: itemData.description,
            category: itemData.category,
            status: itemData.status,
            quantity: itemData.quantity,
            warehouse_name: warehouse ? warehouse.warehouse_name : '',
          });
        } catch (error) {
          console.error('Failed to load inventory item', error);
        }
      };
      fetchInventoryItem();
    }
  }, [action, id, warehouses]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: '' }));
  }

  const validateForm = () => {
    const errors = {};
    if (!formData.warehouse_id) {
      errors.warehouse_id = 'Warehouse is required';
    } else if (isNaN(parseInt(formData.warehouse_id))) {
      errors.warehouse_id = 'Invalid warehouse ID';
    }
    if (!formData.item_name) errors.item_name = 'Item Name is required';
    if (!formData.description) errors.description = 'Description is required';
    if (!formData.category) errors.category = 'Category is required';
    if (formData.status === 'In Stock') {
      if (!formData.quantity || parseInt(formData.quantity) < 1) {
        errors.quantity = 'Quantity must be at least 1';
      }
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const quantityChecker = (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  };

  const formatDataForApi = () => ({
    ...formData,
    warehouse_id: parseInt(formData.warehouse_id),
    quantity:
      formData.status === 'Out of Stock' ? 0 : parseInt(formData.quantity),
  });
  const redirecting = () => {
    Swal.fire({
      position: 'center-center',
      showConfirmButton: false,
      timer: 1200,
      timerProgressBar: true,
      icon: 'warning',
      title: 'Redirecting to previous page',
      didClose: () => {
        navigate('/inventory');
      },
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    } else {
      const formattedData = formatDataForApi();
      try {
        if (action === 'add') {
          await api.addInventoryItem(formattedData);
          Swal.fire({
            icon: 'success',
            title: 'Added Successfully!',
            text: 'Inventory item added successfully',
            position: 'center-center',
            timer: 1500,
            showConfirmButton: false,
            didClose: () => {
              navigate('/inventory');
            },
          });
        } else if (action === 'update') {
          await api.updateInventoryItem(formattedData, id);
          Swal.fire({
            icon: 'success',
            title: 'Update Successful!',
            text: 'Your inventory item has been successfully updated!',
            position: 'center-center',
            timerProgressBar: true,
            timer: 1200,
            showConfirmButton: false,
            didClose: () => {
              navigate('/inventory');
            },
          });
        }
      } catch (error) {
        console.error('Error Updating Inventory Item: ', error);
      }
    }
  };

  return (
    <div className="inventory-item">
      <div className="inventory-item__header">
        <img
          src={backArrow}
          alt="Back Arrow"
          className="inventory-item__header-arrow"
          onClick={() => navigate(-1)}
        />
        <h1 className="inventory-item__header-title">
          {action === 'add' ? 'Add New Inventory Item' : 'Edit Inventory Item'}
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="inventory-item__form">
        <div className="inventory-item__container">
          <div className="inventory-item__details">
            <h2 className="inventory-item__details-title">Item Details</h2>
            <div className="inventory-item__field">
              <label className="inventory-item__label">Item Name</label>
              <input
                type="text"
                name="item_name"
                placeholder="Item Name"
                className={`inventory-item__input
                  ${error.item_name && `inventory-item__input--err`}`}
                value={formData.item_name}
                onChange={handleChange}
              />
              {error.item_name && (
                <div className="inventory-item__error-container">
                  <img
                    src={errorIcon}
                    alt="error"
                    className={`inventory-item__error-icon`}
                  />
                  <p className="inventory-item__error">{error.item_name}</p>
                </div>
              )}
            </div>
            <div className="inventory-item__field">
              <label className="inventory-item__label">Description</label>
              <textarea
                name="description"
                placeholder="Please enter a brief item description..."
                className={`inventory-item__input inventory-item__input--textarea ${
                  error.description && `inventory-item__input--err`
                }`}
                value={formData.description}
                onChange={handleChange}
              />
              {error.description && (
                <div className="inventory-item__error-container">
                  <img
                    src={errorIcon}
                    alt="error"
                    className={`inventory-item__error-icon`}
                  />
                  <p className="inventory-item__error">{error.description}</p>
                </div>
              )}
            </div>
            <div className="inventory-item__field">
              <label className="inventory-item__label">Category</label>
              <select
                name="category"
                className={`inventory-item__input inventory-item__input--select 
                  ${error.category && `inventory-item__input--err`}`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Please select</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {error.category && (
                <div className="inventory-item__error-container">
                  <img
                    src={errorIcon}
                    alt="error"
                    className={`inventory-item__error-icon`}
                  />
                  <p className="inventory-item__error">{error.category}</p>
                </div>
              )}
            </div>
          </div>
          <div className="inventory-item__availability">
            <h2 className="inventory-item__availability-title">
              Item Availability
            </h2>

            <div className="inventory-item__field">
              <label className="inventory-item__label">Status</label>
              <div className="inventory-item__status">
                <div className="inventory-item__radio-wrapper">
                  <input
                    type="radio"
                    id="inStock"
                    name="status"
                    value="In Stock"
                    checked={formData.status === 'In Stock'}
                    onChange={handleChange}
                    className="inventory-item__radio"
                  />
                  <label
                    htmlFor="inStock"
                    className="inventory-item__radio-label"
                  >
                    In stock
                  </label>
                </div>
                <div className="inventory-item__radio-wrapper">
                  <input
                    type="radio"
                    id="outOfStock"
                    name="status"
                    value="Out of Stock"
                    checked={formData.status === 'Out of Stock'}
                    onChange={handleChange}
                    className="inventory-item__radio"
                  />
                  <label
                    htmlFor="outOfStock"
                    className="inventory-item__radio-label"
                  >
                    Out of stock
                  </label>
                </div>
              </div>
            </div>
            {formData.status === 'In Stock' && (
              <div className="inventory-item__field">
                <label className="inventory-item__label">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="0"
                  className={`inventory-item__input ${
                    error.quantity && `inventory-item__input--err`
                  }`}
                  value={formData.quantity}
                  onChange={handleChange}
                  onInput={quantityChecker}
                  min="0"
                />
                {error.quantity && (
                  <div className="inventory-item__error-container">
                    <img
                      src={errorIcon}
                      alt="error"
                      className="inventory-item__error-icon"
                    />
                    <p className="inventory-item__error">{error.quantity}</p>
                  </div>
                )}
              </div>
            )}

            <div className="inventory-item__field">
              <label className="inventory-item__label">Warehouse</label>
              <select
                name="warehouse_id"
                className={`inventory-item__input inventory-item__input--select 
                  ${error.warehouse_id && `inventory-item__input--err`}`}
                value={formData.warehouse_id}
                onChange={handleChange}
              >
                <option value="">Please select</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.warehouse_name}
                  </option>
                ))}
              </select>
              {error.warehouse_id && (
                <div className="inventory-item__error-container">
                  <img
                    src={errorIcon}
                    alt="error"
                    className={`inventory-item__error-icon`}
                  />
                  <p className="inventory-item__error">{error.warehouse_id}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="inventory-item__actions">
          <button
            type="button"
            className="inventory-item__button inventory-item__button--secondary"
            onClick={() => {
              redirecting();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inventory-item__button inventory-item__button--primary"
          >
            {action === 'add' ? '+ Add Item' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
export default InventoryItemFormPage;

InventoryItemFormPage.propTypes = {
  action: PropTypes.string.isRequired,
};
