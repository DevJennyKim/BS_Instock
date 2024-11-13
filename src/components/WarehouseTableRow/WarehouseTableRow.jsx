import "./WarehouseTableRow.scss";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import PropTypes from "prop-types";

function WarehouseTableRow({ warehouseInfo }) {
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_phone,
    contact_email,
  } = warehouseInfo;
  return (
    <article className={`table-row`}>
      <div className="table-row__information">
        <div className="table-row__detail-container">
          <h3 className={`table-row__label`}>WAREHOUSE</h3>
          <p className={`table-row__detail`}>{warehouse_name}</p>
        </div>

        <div className="table-row__detail-container">
          <h3 className={`table-row__label`}>ADDRESS</h3>
          <p className={`table-row__detail`}>{address},</p>
          <p className={`table-row__detail`}>
            {city}, {country}
          </p>
        </div>
      </div>

      <div className="table-row__information">
        <div className="table-row__detail-container">
          <h3 className={`table-row__label`}>CONTACT NAME</h3>
          <p className={`table-row__detail`}>{contact_name}</p>
        </div>

        <div className="table-row__detail-container">
          <h3 className={`table-row__label`}>CONTACT INFORMATION</h3>
          <p className={`table-row__detail`}>{contact_phone}</p>
          <p className={`table-row__detail`}>{contact_email}</p>
        </div>
      </div>
      <div className="table-row__icon-container">
        <img src={deleteIcon} alt="delete button" />
        <img src={editIcon} alt="edit button" />
      </div>
    </article>
  );
}

export default WarehouseTableRow;

WarehouseTableRow.propTypes = {
  warehouseInfo: PropTypes.object.isRequired,
};
