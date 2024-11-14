import "./WarehouseDetailsPage.scss";
import * as api from "../../api/instock-api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import backIcon from "../../assets/Icons/arrow_back-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import TableHeader from "../../components/TableHeader/TableHeader";
import sortIcon from "../../assets/Icons/sort-24px.svg";

function WarehouseDetailsPage() {
  const [warehouseDetails, setWarehouseDetails] = useState(null);
  const { id } = useParams();

  const headerConfigs = [
    "INVENTORY ITEM",
    "CATEGORY",
    "STATUS",
    "QUANTITY",
    "ACTIONS",
  ];

  useEffect(() => {
    const getWarehouseDetails = async () => {
      try {
        const response = await api.getWarehouseById(id);
        setWarehouseDetails(response);
      } catch (error) {
        console.error("Error loading warehouse details:", error);
      }
    };
    getWarehouseDetails();
  }, [id]);

  if (!warehouseDetails) {
    return (
      <div className="warehouse-details__error">No warehouse details found</div>
    );
  }

  return (
    <section className="warehouse-details">
      <div className="warehouse-details__header-container">
        <div className="warehouse-details__title-wrapper">
          <Link to="/warehouses">
            <img
              src={backIcon}
              alt="back"
              className="warehouse-details__back-icon"
            />
          </Link>
          <h1 className="warehouse-details__title">
            {warehouseDetails.warehouse_name}
          </h1>
        </div>
        <Link
          to={`/warehouses/${id}/edit`}
          className="warehouse-details__edit-button"
        >
          <img src={editIcon} alt="edit" />
          <span>Edit</span>
        </Link>
      </div>
      <div className="warehouse-details__info">
        <div className="warehouse-details__address">
          <h3 className="warehouse-details__label">WAREHOUSE ADDRESS:</h3>
          <p className="warehouse-details__text">
            {warehouseDetails.address}, {warehouseDetails.city},{" "}
            {warehouseDetails.country}
          </p>
        </div>
        <div className="warehouse-details__contact">
          <div className="warehouse-details__contact-name">
            <h3 className="warehouse-details__label">CONTACT NAME:</h3>
            <p className="warehouse-details__text">
              {warehouseDetails.contact_name}
            </p>
            <p className="warehouse-details__text">Warehouse Manager</p>
          </div>
          <div className="warehouse-details__contact-info">
            <h3 className="warehouse-details__label">CONTACT INFORMATION:</h3>
            <p className="warehouse-details__text">
              {warehouseDetails.contact_phone}
            </p>
            <p className="warehouse-details__text">
              {warehouseDetails.contact_email}
            </p>
          </div>
        </div>
      </div>
      <div className="warehouse-details__inventory">
        <div className="warehouse-details__column-headers">
          {headerConfigs.map((header) => (
            <TableHeader
              key={header}
              tableName="warehouse-details"
              header={header}
            />
          ))}
        </div>
      </div>
      <ul className="warehouse-details__list">
        {warehouseDetails.inventory?.map((item) => (
          <li key={item.id}>
            <WarehouseInventoryItem itemInfo={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default WarehouseDetailsPage;
