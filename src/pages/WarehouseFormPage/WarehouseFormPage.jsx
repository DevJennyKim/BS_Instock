import './WarehouseFormPage.scss';
import { useEffect, useState } from 'react';
import backIcon from '../../assets/Icons/arrow_back-24px.svg';
import FormField from '../../components/FormField/FormField';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../../api/instock-api';
import validator from 'validator';
import { phone } from 'phone';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

function WarehouseForm({ action }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [newWarehouse, setNewWarehouse] = useState({
    warehouse_name: '',
    address: '',
    city: '',
    country: '',
    contact_name: '',
    contact_position: '',
    contact_phone: '',
    contact_email: '',
  });

  useEffect(() => {
    const loadWarehouseDetails = async (warehouseId) => {
      const warehouseDetails = await api.getWarehouseById(warehouseId);
      const { id, created_at, updated_at, ...formFields } = warehouseDetails;
      setNewWarehouse(formFields);
    };
    if (action === 'update') {
      loadWarehouseDetails(id);
    }
  }, [action, id]);

  const warehouseDetailsConfigs = [
    {
      label: 'Warehouse Name',
      name: 'warehouse_name',
      placeholder: 'Warehouse Name',
    },
    { label: 'Street Address', name: 'address', placeholder: 'Street Address' },
    { label: 'City', name: 'city', placeholder: 'City' },
    { label: 'Country', name: 'country', placeholder: 'Country' },
  ];

  const contactDetailsConfigs = [
    {
      label: 'Contact Name',
      name: 'contact_name',
      placeholder: 'Contact Name',
    },
    { label: 'Position', name: 'contact_position', placeholder: 'Position' },
    {
      label: 'Phone Number',
      name: 'contact_phone',
      placeholder: 'Phone Number',
    },
    { label: 'Email', name: 'contact_email', placeholder: 'Email' },
  ];

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setNewWarehouse((prevWarehouse) => ({
      ...prevWarehouse,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    for (const [key, value] of Object.entries(newWarehouse)) {
      if (key === 'contact_email') {
        if (!validator.isEmail(value)) {
          errors[key] = 'Please enter a valid email address';
        }
      } else if (key === 'contact_phone') {
        if (!phone(value).isValid) {
          errors[key] =
            'Please enter a valid phone number. Format: +X (XXX) XXX-XXXX';
        }
      }
      if (!value) {
        errors[key] = 'This field is required';
      }
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const redirecting = () => {
    Swal.fire({
      position: 'center-center',
      showConfirmButton: false,
      timer: 1200,
      timerProgressBar: true,
      icon: 'warning',
      title: 'Redirecting to previous page',
      didClose: () => {
        navigate(-1);
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (action === 'add') {
        await api.addWarehouse(newWarehouse);
        Swal.fire({
          icon: 'success',
          title: 'Added Successfully!',
          text: 'Warehouse added successfully',
          position: 'center-center',
          timerProgressBar: true,
          timer: 1500,
          showConfirmButton: false,
          didClose: () => {
            navigate('/warehouses');
          },
        });
      } else if (action === 'update') {
        await api.updateWarehouse(newWarehouse, id);
        Swal.fire({
          icon: 'success',
          title: 'Update Successful!',
          text: 'Your Warehouse has been successfully updated!',
          position: 'center-center',
          timerProgressBar: true,
          timer: 1500,
          showConfirmButton: false,
          didClose: () => {
            navigate(-1);
          },
        });
      }

      setNewWarehouse({
        warehouse_name: '',
        address: '',
        city: '',
        country: '',
        contact_name: '',
        contact_position: '',
        contact_phone: '',
        contact_email: '',
      });
      setErrorMessages({});
      console.log('Form Valid');
    }
  };

  return (
    <section className="warehouse-page">
      <div className="warehouse-page__title-wrapper">
        <div>
          <img
            src={backIcon}
            alt="back"
            className="warehouse-details__back-icon"
            onClick={() => navigate(-1)}
          />
        </div>
        <h1 className="warehouse-page__title">
          {action === 'add' ? 'Add New Warehouse' : 'Edit Warehouse'}
        </h1>
      </div>

      <form action="submit" className="warehouse-form" onSubmit={handleSubmit}>
        <section className="warehouse-form__warehouse-details">
          <h2 className="warehouse-form__section-header">Warehouse Details</h2>
          {warehouseDetailsConfigs.map(({ label, name, placeholder }) => (
            <FormField
              key={name}
              formName="warehouse-form"
              label={label}
              name={name}
              placeholder={placeholder}
              value={newWarehouse[name]}
              onChange={handleFieldChange}
              errorMessage={errorMessages[name]}
            />
          ))}
        </section>
        <section className="warehouse-form__contact-details">
          <h2 className="warehouse-form__section-header">Contact Details</h2>
          {contactDetailsConfigs.map(({ label, name, placeholder }) => (
            <FormField
              key={name}
              formName="warehouse-form"
              label={label}
              name={name}
              placeholder={placeholder}
              value={newWarehouse[name]}
              onChange={handleFieldChange}
              errorMessage={errorMessages[name]}
            />
          ))}
        </section>
        <div className="warehouse-form__button-container">
          <button
            className="warehouse-form__link"
            type="button"
            onClick={() => {
              redirecting();
            }}
          >
            Cancel
          </button>
          <button className="warehouse-form__button" type="submit">
            {action === 'add' ? '+ Add Warehouse' : 'Save'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default WarehouseForm;

WarehouseForm.propTypes = {
  action: PropTypes.string.isRequired,
};
