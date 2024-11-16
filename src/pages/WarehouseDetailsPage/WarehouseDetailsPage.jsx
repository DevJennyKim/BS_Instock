import "./WarehouseDetailsPage.scss";
import * as api from "../../api/instock-api";
import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import backIcon from "../../assets/Icons/arrow_back-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import WarehouseInventoryItem from "../../components/WarehouseInventoryItem/WarehouseInventoryItem";
import TableHeader from "../../components/TableHeader/TableHeader";

function WarehouseDetailsPage() {
  const [warehouseDetails, setWarehouseDetails] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const { id } = useParams();

  const headerConfigs = [
    { text: "INVENTORY ITEM", property: "item_name" },
    { text: "CATEGORY", property: "category" },
    { text: "STATUS", property: "status" },
    { text: "QUANTITY", property: "quantity" },
    { text: "ACTIONS", property: "" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const warehouseResponse = await api.getWarehouseById(id);
        setWarehouseDetails(warehouseResponse);

        const inventoryResponse = await api.getInventoryByWarehouseId(id);
        setInventory(inventoryResponse);
      } catch (error) {
        console.error("Error loading warehouse data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSort = async (property) => {
    const newOrder = !isAscending;
    setIsAscending(newOrder);
    const order = newOrder ? "asc" : "desc";

    const sortedData = await api.getSortedInventories(property, order);
    const filteredData = sortedData.filter(
      (item) => item.warehouse_name === warehouseDetails.warehouse_name
    );
    setInventory(filteredData);
  };

  const handleDelete = useCallback(
    async (itemId) => {
      await api.deleteInventoryItem(itemId);
      const inventoryResponse = await api.getInventoryByWarehouseId(id);
      setInventory(inventoryResponse);
    },
    [id]
  );

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
        <TableHeader headers={headerConfigs} handleClick={handleSort} />
      </div>
      <ul className="warehouse-details__list">
        {inventory[0]?.item_name &&
          inventory?.map((inventoryItem) => (
            <li key={inventoryItem.id}>
              <WarehouseInventoryItem
                inventoryItem={inventoryItem}
                handleDelete={handleDelete}
              />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default WarehouseDetailsPage;
