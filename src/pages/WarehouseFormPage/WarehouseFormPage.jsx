import "./WarehouseFormPage.scss";
import { useState } from "react";
import backIcon from "../../assets/Icons/arrow_back-24px.svg";
import errorIcon from "../../assets/Icons/error-24px.svg";
import { Link, useParams } from "react-router-dom";
import { addWarehouse, updateWarehouse } from "../../api/instock-api";
import validator from "validator";
import { phone } from "phone";
import PropTypes from "prop-types";

function WarehouseForm({ action }) {
  const { id } = useParams();
  const [errorMessages, setErrorMessages] = useState({});
  const [newWarehouse, setNewWarehouse] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

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
      if (key === "contact_email") {
        if (!validator.isEmail(value)) {
          errors[key] = "Please enter a valid email address";
        }
      } else if (key === "contact_phone") {
        if (!phone(value).isValid) {
          errors[key] =
            "Please enter a valid phone number. Format: +X (XXX) XXX-XXXX";
        }

        if (!value) {
          errors[key] = "This field is required";
        }
      }
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (action === "add") {
        await addWarehouse(newWarehouse);
      } else if (action === "update") {
        await updateWarehouse(newWarehouse, id);
      }

      setNewWarehouse({
        warehouse_name: "",
        address: "",
        city: "",
        country: "",
        contact_name: "",
        contact_position: "",
        contact_phone: "",
        contact_email: "",
      });
      setErrorMessages({});
      console.log("Form Valid");
    }
  };

  return (
    <section className="warehouse-page">
      <div className="warehouse-page__title-wrapper">
        <Link to="/warehouses">
          <img
            src={backIcon}
            alt="back"
            className="warehouse-details__back-icon"
          />
        </Link>
        <h1 className="warehouse-page__title">
          {action === "add" ? "Add New Warehouse" : "Edit Warehouse"}
        </h1>
      </div>

      <form action="submit" className="warehouse-form" onSubmit={handleSubmit}>
        <section className="warehouse-form__warehouse-details">
          <h2 className="warehouse-form__section-header">Warehouse Details</h2>

          <label className="warehouse-form__label">
            Warehouse Name
            <input
              type="text"
              className={`warehouse-form__input ${
                errorMessages.warehouse_name && "warehouse-form__input--error"
              }`}
              name="warehouse_name"
              id="warehouse_name"
              placeholder="Warehouse Name"
              value={newWarehouse.warehouse_name}
              onChange={handleFieldChange}
            />
            {errorMessages.warehouse_name && (
              <p className="warehouse-form__error-message">
                <img
                  src={errorIcon}
                  alt="error"
                  className="warehouse-form__error-message-icon"
                />
                {errorMessages.warehouse_name}
              </p>
            )}
          </label>

          <label className="warehouse-form__label">
            Street Address
            <input
              type="text"
              className={`warehouse-form__input ${
                errorMessages.address && "warehouse-form__input--error"
              }`}
              name="address"
              id="address"
              placeholder="Street Adress"
              value={newWarehouse.address}
              onChange={handleFieldChange}
            />
            {errorMessages.address && (
              <p className="warehouse-form__error-message">
                <img
                  src={errorIcon}
                  alt="error"
                  className="warehouse-form__error-message-icon"
                />
                {errorMessages.address}
              </p>
            )}
          </label>

          <label className="warehouse-form__label">
            City
            <input
              type="text"
              className={`warehouse-form__input ${
                errorMessages.city && "warehouse-form__input--error"
              }`}
              name="city"
              id="city"
              placeholder="City"
              value={newWarehouse.city}
              onChange={handleFieldChange}
            />
            {errorMessages.city && (
              <p className="warehouse-form__error-message">
                <img
                  src={errorIcon}
                  alt="error"
                  className="warehouse-form__error-message-icon"
                />
                {errorMessages.city}
              </p>
            )}
          </label>

          <label className="warehouse-form__label">
            Country
            <input
              type="text"
              className={`warehouse-form__input ${
                errorMessages.country && "warehouse-form__input--error"
              }`}
              name="country"
              id="country"
              placeholder="Country"
              value={newWarehouse.country}
              onChange={handleFieldChange}
            />
            {errorMessages.country && (
              <p className="warehouse-form__error-message">
                <img
                  src={errorIcon}
                  alt="error"
                  className="warehouse-form__error-message-icon"
                />
                {errorMessages.country}
              </p>
            )}
          </label>
        </section>
        <section className="warehouse-form__contact-details">
          <h2 className="warehouse-form__section-header">Contact Details</h2>

          <label htmlFor="contact_name" className="warehouse-form__label">
            Contact Name
            <input
              type="text"
              className={`warehouse-form__input ${
                errorMessages.contact_name && "warehouse-form__input--error"
              }`}
              name="contact_name"
              id="contact_name"
              placeholder="Contact Name"
              value={newWarehouse.contact_name}
              onChange={handleFieldChange}
            />
            {errorMessages.contact_name && (
              <p className="warehouse-form__error-message">
                <img
                  src={errorIcon}
                  alt="error"
                  className="warehouse-form__error-message-icon"
                />
                {errorMessages.contact_name}
              </p>
            )}
          </label>

          <label htmlFor="contact_position" className="warehouse-form__label">
            Position
            <input
              type="text"
              className={`warehouse-form__input ${
                errorMessages.contact_position && "warehouse-form__input--error"
              }`}
              name="contact_position"
              id="contact_position"
              placeholder="Position"
              value={newWarehouse.contact_position}
              onChange={handleFieldChange}
            />
            {errorMessages.contact_position && (
              <p className="warehouse-form__error-message">
                <img
                  src={errorIcon}
                  alt="error"
                  className="warehouse-form__error-message-icon"
                />
                {errorMessages.contact_position}
              </p>
            )}
          </label>

          <label htmlFor="contact_phone" className="warehouse-form__label">
            Phone Number
            <input
              type="text"
              className={`warehouse-form__input ${
                errorMessages.contact_phone && "warehouse-form__input--error"
              }`}
              name="contact_phone"
              id="contact_phone"
              placeholder="Phone Number"
              value={newWarehouse.contact_phone}
              onChange={handleFieldChange}
            />
            {errorMessages.contact_phone && (
              <p className="warehouse-form__error-message">
                <img
                  src={errorIcon}
                  alt="error"
                  className="warehouse-form__error-message-icon"
                />
                {errorMessages.contact_phone}
              </p>
            )}
          </label>

          <label htmlFor="contact_email" className="warehouse-form__label">
            Email
            <input
              type="text"
              className={`warehouse-form__input ${
                errorMessages.contact_email && "warehouse-form__input--error"
              }`}
              name="contact_email"
              id="contact_email"
              placeholder="Email"
              value={newWarehouse.contact_email}
              onChange={handleFieldChange}
            />
            {errorMessages.contact_email && (
              <p className="warehouse-form__error-message">
                <img
                  src={errorIcon}
                  alt="error"
                  className="warehouse-form__error-message-icon"
                />
                {errorMessages.contact_email}
              </p>
            )}
          </label>
        </section>
        <div className="warehouse-form__button-container">
          <Link to="/warehouses" className="warehouse-form__link">
            Cancel
          </Link>
          <button className="warehouse-form__button">
            {action === "add" ? "+ Add Warehouse" : "Save"}
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
