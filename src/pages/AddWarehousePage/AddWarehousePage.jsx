import "./AddWarehousePage.scss";
import { Link } from "react-router-dom";
import backIcon from "../../assets/Icons/arrow_back-24px.svg";

function AddWarehousePage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="add-warehouse-page">
      <div className="add-warehouse-page__title-wrapper">
        <Link to="/warehouses">
          <img
            src={backIcon}
            alt="back"
            className="warehouse-details__back-icon"
          />
        </Link>
        <h1 className="add-warehouse-page__title">Add New Warehouse</h1>
      </div>

      <form
        action="submit"
        className="add-warehouse-form"
        onSubmit={handleSubmit}
      >
        <section className="add-warehouse-form__warehouse-details">
          <h2 className="add-warehouse-form__section-header">
            Warehouse Details
          </h2>

          <label htmlFor="warehouse_name" className="add-warehouse-form__label">
            Warehouse Name
            <input
              type="text"
              className="add-warehouse-form__input"
              name="warehouse_name"
              id="warehouse_name"
              placeholder="Warehouse Name"
            />
          </label>

          <label htmlFor="address" className="add-warehouse-form__label">
            Street Address
            <input
              type="text"
              className="add-warehouse-form__input"
              name="address"
              id="address"
              placeholder="Street Adress"
            />
          </label>

          <label htmlFor="city" className="add-warehouse-form__label">
            City
            <input
              type="text"
              className="add-warehouse-form__input"
              name="city"
              id="city"
              placeholder="City"
            />
          </label>

          <label htmlFor="country" className="add-warehouse-form__label">
            Country
            <input
              type="text"
              className="add-warehouse-form__input"
              name="country"
              id="country"
              placeholder="Country"
            />
          </label>
        </section>
        <section className="add-warehouse-form__contact-details">
          <h2 className="add-warehouse-form__section-header">
            Contact Details
          </h2>

          <label htmlFor="contact_name" className="add-warehouse-form__label">
            Contact Name
            <input
              type="text"
              className="add-warehouse-form__input"
              name="contact_name"
              id="contact_name"
              placeholder="Contact Name"
            />
          </label>

          <label
            htmlFor="contact_position"
            className="add-warehouse-form__label"
          >
            Position
            <input
              type="text"
              className="add-warehouse-form__input"
              name="contact_position"
              id="contact_position"
              placeholder="Position"
            />
          </label>

          <label htmlFor="contact_phone" className="add-warehouse-form__label">
            Phone Number
            <input
              type="text"
              className="add-warehouse-form__input"
              name="contact_phone"
              id="contact_phone"
              placeholder="Phone Number"
            />
          </label>

          <label htmlFor="contact_email" className="add-warehouse-form__label">
            Email
            <input
              type="text"
              className="add-warehouse-form__input"
              name="contact_email"
              id="contact_email"
              placeholder="Email"
            />
          </label>
        </section>
        <div className="add-warehouse-form__button-container">
          <Link to="/warehouses" className="add-warehouse-form__link">
            Cancel
          </Link>
          <button className="add-warehouse-form__button">
            + Add Warehouse
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddWarehousePage;
