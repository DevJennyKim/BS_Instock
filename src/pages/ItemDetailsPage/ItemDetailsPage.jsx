import "./ItemDetailsPage.scss";
import * as api from "../../api/instock-api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import backIcon from "../../assets/Icons/arrow_back-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";

function ItemDetailsPage() {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        const response = await api.getInventoryItemById(id);
        setItemDetails(response);
      } catch (error) {
        console.error("Error loading warehouse details:", error);
      }
    };

    getItemDetails();
  }, [id]);

  if (!itemDetails) {
    return (
      <div className={`item-details-page__error`}>
        No warehouse details found.
      </div>
    );
  }

  return (
    <section className={`item-details-page`}>
      <div className={`item-details-page__header-container`}>
        <div className={`item-details-page__title-wrapper`}>
          <Link to="/inventory">
            <img
              src={backIcon}
              alt="back"
              className={`item-details-page__back-icon`}
            />
          </Link>
          <h1 className={`item-details-page__title`}>
            {itemDetails.item_name}
          </h1>
        </div>
        <Link
          to={`/inventory/${id}/edit`}
          className={`item-details-page__edit-button`}
        >
          <img src={editIcon} alt="edit" />
          <span>Edit</span>
        </Link>
      </div>

      {/* Item Details */}
      <div className={`item-details-page__info`}>
        <div className={`item-details-page__container`}>
          <div className="item-details-page__detail-container">
            <h3 className={`item-details-page__label`}>ITEM DESCRIPTION:</h3>
            <p className={`item-details-page__text`}>
              {itemDetails.description}
            </p>
          </div>
          <div className={`item-details-page__contact`}>
            <div className="item-details-page__detail-container">
              <h3 className={`item-details-page__label`}>CATEGORY:</h3>
              <p className={`item-details-page__text`}>
                {itemDetails.category}
              </p>
            </div>
          </div>
        </div>
        <div className={`item-details-page__container`}>
          <div className="item-details-page__detail-container">
            <h3 className={`item-details-page__label`}>STATUS:</h3>
            <p
              className={`item-details-page__text ${
                itemDetails.status === "In Stock"
                  ? "item-details-page__text--in-stock"
                  : "item-details-page__text--out-of-stock"
              }`}
            >
              {itemDetails.status}
            </p>
          </div>
          <div className="item-details-page__detail-container">
            <h3 className={`item-details-page__label`}>QUANTITY:</h3>
            <p className={`item-details-page__text`}>{itemDetails.quantity}</p>
          </div>
          <div className="item-details-page__detail-container">
            <h3 className={`item-details-page__label`}>WAREHOUSE:</h3>
            <p className={`item-details-page__text`}>
              {itemDetails.warehouse_name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ItemDetailsPage;
