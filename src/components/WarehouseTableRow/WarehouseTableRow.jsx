import "./WarehouseTableRow.scss";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import chevron from "../../assets/Icons/chevron_right-24px.svg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeletePopup from "../DeletePopup/DeletePopup.jsx";

function WarehouseTableRow({ warehouseInfo, handleClick }) {
  const {
    id,
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_phone,
    contact_email,
  } = warehouseInfo;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmDelete = () => {
    handleClick(id);
    closeModal();
  };

  return (
    <article className={`warehouse-table-row`}>
      <div className="warehouse-table-row__detail-container">
        <h3 className={`warehouse-table-row__label`}>WAREHOUSE</h3>
        <div className="warehouse-table-row__warehouse-container">
          <Link
            to={`/warehouses/${id}`}
            className="warehouse-table-row__detail warehouse-table-row__detail--link"
          >
            {warehouse_name}
          </Link>
          <img
            src={chevron}
            alt="chevron"
            className="warehouse-table-row__icon--small"
          />
        </div>
      </div>
      <div className="warehouse-table-row__detail-container">
        <h3 className={`warehouse-table-row__label`}>CONTACT NAME</h3>
        <p className={`warehouse-table-row__detail`}>{contact_name}</p>
      </div>

      <div className="warehouse-table-row__detail-container">
        <h3 className={`warehouse-table-row__label`}>ADDRESS</h3>
        <p className={`warehouse-table-row__detail`}>{address},</p>
        <p className={`warehouse-table-row__detail`}>
          {city}, {country}
        </p>
      </div>

      <div className="warehouse-table-row__detail-container">
        <h3 className={`warehouse-table-row__label`}>CONTACT INFORMATION</h3>
        <p className={`warehouse-table-row__detail`}>{contact_phone}</p>
        <p className={`warehouse-table-row__detail`}>{contact_email}</p>
      </div>

      <div className="warehouse-table-row__icon-container">
        <img
          src={deleteIcon}
          alt="delete button"
          className="warehouse-table-row__icon"
          onClick={openModal}
        />
        <Link
          to={`/warehouses/${id}/edit`}
          className="warehouse-table-row__icon-link"
        >
          <img
            src={editIcon}
            alt="edit button"
            className="warehouse-table-row__icon"
          />
        </Link>
      </div>
      <DeletePopup
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        title={`Delete ${warehouse_name} warehouse?`}
        content={`Please confirm that you'd like to delete the ${warehouse_name} warehouse from the list of warehouses. You won't be able to undo this action.`}
      />
    </article>
  );
}

export default WarehouseTableRow;

WarehouseTableRow.propTypes = {
  warehouseInfo: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};
