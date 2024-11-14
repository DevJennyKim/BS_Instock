import "./WarehouseFormPage.scss";
import { useState } from "react";
import backIcon from "../../assets/Icons/arrow_back-24px.svg";
import FormField from "../../components/FormField/FormField";
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

  const warehouseDetailsConfigs = [
    {
      label: "Warehouse Name",
      name: "warehouse_name",
      placeholder: "Warehouse Name",
    },
    { label: "Street Address", name: "address", placeholder: "Street Address" },
    { label: "City", name: "city", placeholder: "City" },
    { label: "Country", name: "country", placeholder: "Country" },
  ];

  const contactDetailsConfigs = [
    {
      label: "Contact Name",
      name: "contact_name",
      placeholder: "Contact Name",
    },
    { label: "Position", name: "contact_position", placeholder: "Position" },
    {
      label: "Phone Number",
      name: "contact_phone",
      placeholder: "Phone Number",
    },
    { label: "Email", name: "contact_email", placeholder: "Email" },
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
      if (key === "contact_email") {
        if (!validator.isEmail(value)) {
          errors[key] = "Please enter a valid email address";
        }
      } else if (key === "contact_phone") {
        if (!phone(value).isValid) {
          errors[key] =
            "Please enter a valid phone number. Format: +X (XXX) XXX-XXXX";
        }
      }
      if (!value) {
        errors[key] = "This field is required";
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
