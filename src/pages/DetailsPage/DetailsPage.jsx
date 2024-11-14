import "./DetailsPage.scss";
import * as api from "../../api/instock-api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import backIcon from "../../assets/Icons/arrow_back-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import TableHeader from "../../components/TableHeader/TableHeader";

function DetailsPage({ object }) {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  const headerConfigs = [
    "INVENTORY ITEM",
    "CATEGORY",
    "STATUS",
    "QUANTITY",
    "ACTIONS",
  ];

  const warehouseDetailConfigs = [
    { label: "WAREHOUSE ADDRESS:", info: details.address },
    { label: "CONTACT NAME:", info: details.contact_name },
    { label: "CONTACT INFORMATION:", info: details.address },
  ];

  const itemDetailConfigs = [
    { label: "ITEM DESCRIPTION:", info: details.description },
    { label: "CATEGORY:", info: details.category },
    { label: "STATUS:", info: details.status },
    { label: "QUANTITY:", info: details.quantity },
    { label: "WAREHOUSE:", info: details.warehouse_name },
  ];

  useEffect(() => {
    const getDetails = async () => {
      try {
        if (object === "warehouse") {
          const response = await api.getWarehouseById(id);
          setDetails(response);
        } else if (object === "item") {
          const response = await api.getInventoryItemById(id);
          setDetails(response);
        }
      } catch (error) {
        console.error("Error loading warehouse details:", error);
      }
    };
    getDetails();
  }, [id, object]);

  if (!details) {
    return (
      <div className={`details-page__error`}>No warehouse details found.</div>
    );
  }

  return (
    <section className={`details-page`}>
      <div className={`details-page__header-container`}>
        <div className={`details-page__title-wrapper`}>
          <Link to={object === "warehouse" ? "/warehouses" : "/inventory"}>
            <img
              src={backIcon}
              alt="back"
              className={`details-page__back-icon`}
            />
          </Link>
          <h1 className={`details-page__title`}>
            {object === "warehouse"
              ? details.warehouse_name
              : details.item_name}
          </h1>
        </div>
        <Link
          to={
            object === "warehouse"
              ? `/warehouses/${id}/edit`
              : `/inventory/${id}/edit`
          }
          className={`details-page__edit-button`}
        >
          <img src={editIcon} alt="edit" />
          <span>Edit</span>
        </Link>
      </div>
      <div className={`details-page__info`}>
        <div className={`details-page__address`}>
          <h3 className={`details-page__label`}>WAREHOUSE ADDRESS:</h3>
          <p className={`details-page__text`}>
            {details.address}, {details.city}, {details.country}
          </p>
        </div>
        <div className={`details-page__contact`}>
          <div className={`details-page__contact-name`}>
            <h3 className={`details-page__label`}>CONTACT NAME:</h3>
            <p className={`details-page__text`}>{details.contact_name}</p>
            <p className={`details-page__text`}>Warehouse Manager</p>
          </div>
          <div className="details-page__contact-info">
            <h3 className={`details-page__label`}>CONTACT INFORMATION:</h3>
            <p className={`details-page__text`}>{details.contact_phone}</p>
            <p className={`details-page__text`}>{details.contact_email}</p>
          </div>
        </div>
      </div>

      {/* Warehouse Inventory Start */}
      {object === "warehouse" && (
        <div className={`details-page__inventory`}>
          <TableHeader headers={headerConfigs} />
        </div>
      )}
    </section>
  );
}

export default DetailsPage;
