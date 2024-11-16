import PropTypes from "prop-types";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import "./WarehouseInventoryItem.scss";
import { Link } from "react-router-dom";
import chevron from "../../assets/Icons/chevron_right-24px.svg";

function WarehouseInventoryItem({ inventoryItem, handleClick }) {
  const { item_name, category, status, quantity, id } = inventoryItem;
  return (
    <article
      key={inventoryItem.id}
      className="warehouse-details__inventory-row"
    >
      <div className="warehouse-details__item-section">
        <h4 className="warehouse-details__section-label">INVENTORY ITEM</h4>
        <div className="warehouse-details__info-section">
          <Link
            to={`/inventory/${inventoryItem.id}`}
            className="warehouse-details__item-link"
          >
            <span className="warehouse-details__text warehouse-details__text--item">
              {item_name}
            </span>
            <img
              src={chevron}
              alt="chevron"
              className="warehouse-details__chevron"
            />
          </Link>
        </div>
      </div>

      <div className="warehouse-details__item-section">
        <h4 className="warehouse-details__section-label">STATUS</h4>
        <p
          className={`warehouse-details__status ${
            status === "In Stock"
              ? "warehouse-details__status--in-stock"
              : "warehouse-details__status--out-of-stock"
          }`}
        >
          {status.toUpperCase()}
        </p>
      </div>

      <div className="warehouse-details__item-section">
        <h4 className="warehouse-details__section-label">CATEGORY</h4>
        <p className="warehouse-details__text">{category}</p>
      </div>

      <div className="warehouse-details__item-section">
        <h4 className="warehouse-details__section-label">QTY</h4>
        <p className="warehouse-details__text">{quantity}</p>
      </div>

      <div className="warehouse-details__icon-section">
        <img
          src={deleteIcon}
          alt="delete button"
          className="warehouse-details__icon"
          onClick={() => handleClick(id)}
          style={{ cursor: "pointer" }}
        />
        <Link
          to={`/inventory/${id}/edit`}
          className="warehouse-table-row__icon-link"
        >
          <img
            src={editIcon}
            alt="edit button"
            className="warehouse-table-row__icon"
          />
        </Link>
      </div>
    </article>
  );
}
WarehouseInventoryItem.propTypes = {
  inventoryItem: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default WarehouseInventoryItem;
