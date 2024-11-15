import PropTypes from "prop-types";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import "./WarehouseInventoryItem.scss";
import { Link } from "react-router-dom";
import chevron from "../../assets/Icons/chevron_right-24px.svg";

function WarehouseInventoryItem({ inventoryItem }) {
    console.log('Inventory item received:', inventoryItem);
    const { item_name, category, status, quantity } =
        inventoryItem;
    return (
        <article key={inventoryItem.id} className="warehouse-details__inventory-row">
            <div className="warehouse-details__item-section">
                <h4 className="warehouse-details__section-label">INVENTORY ITEM</h4>
                <div className="warehouse-details__info-section">
                    <p className="warehouse-details__text warehouse-details__text--item">{item_name}</p>
                    <img
                        src={chevron}
                        alt="chevron"
                        className="warehouse-table-row__icon--small"
                    />
                </div>
            </div>

            <div className="warehouse-details__item-section">
                <h4 className="warehouse-details__section-label">STATUS</h4>
                <p className={`warehouse-details__status ${status.toLowerCase() === "in stock"
                    ? "warehouse-details__status--in-stock"
                    : "warehouse-details__status--out-of-stock"
                    }`}>
                    {status}
                </p>
            </div>

            <div className="warehouse-details__item-section">
                <h4 className="warehouse-details__section-label">CATEGORY</h4>
                <p className="warehouse-details__text">{category}</p>
            </div>

            <div className="warehouse-details__item-section">
                <h4 className="warehouse-details__section-label">QUANTITY</h4>
                <p className="warehouse-details__text">{quantity}</p>
            </div>

            <div className="warehouse-details__icon-section">

                <img
                    src={deleteIcon}
                    alt="delete button"
                    className="warehouse-details__icon"
                />
                <Link
                    to={`/edit-item/`} //need to get this done
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
};

export default WarehouseInventoryItem;