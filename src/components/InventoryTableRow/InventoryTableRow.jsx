import "./InventoryTableRow.scss";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import chevron from "../../assets/Icons/chevron_right-24px.svg";
import PropTypes from "prop-types";

function WarehouseTableRow({ inventoryInfo }) {
  const { warehouse_name, item_name, category, status, quantity } =
    inventoryInfo;
  return (
    <article className={`inventory-table-row`}>
      <div className="inventory-table-row__detail-container">
        <h3 className={`inventory-table-row__label`}>INVENTORY ITEM</h3>
        <div className="inventory-table-row__warehouse-container">
          <p
            className={`inventory-table-row__detail inventory-table-row__detail--link`}
          >
            {item_name}
          </p>
          <img
            src={chevron}
            alt="chevron"
            className="inventory-table-row__icon--small"
          />
        </div>
      </div>
      <div className="inventory-table-row__detail-container">
        <h3 className={`inventory-table-row__label`}>STATUS</h3>
        <p className={`inventory-table-row__detail`}>{status.toUpperCase()}</p>
      </div>

      <div className="inventory-table-row__detail-container">
        <h3 className={`inventory-table-row__label`}>CATEGORY</h3>
        <p className={`inventory-table-row__detail`}>{category}</p>
      </div>

      <div className="inventory-table-row__detail-container">
        <h3 className={`inventory-table-row__label`}>QTY</h3>
        <p className={`inventory-table-row__detail`}>{quantity}</p>
      </div>

      <div className="inventory-table-row__detail-container">
        <h3 className={`inventory-table-row__label`}>WAREHOUSE</h3>
        <p className={`inventory-table-row__detail`}>{warehouse_name}</p>
      </div>

      <div className="inventory-table-row__icon-container">
        <img
          src={deleteIcon}
          alt="delete button"
          className="inventory-table-row__icon"
        />
        <img
          src={editIcon}
          alt="edit button"
          className="inventory-table-row__icon"
        />
      </div>
    </article>
  );
}

export default WarehouseTableRow;

WarehouseTableRow.propTypes = {
  inventoryInfo: PropTypes.object.isRequired,
};
