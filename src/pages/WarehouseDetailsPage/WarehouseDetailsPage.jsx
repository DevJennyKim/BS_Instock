import "./WarehouseDetailsPage.scss";
import * as api from "../../api/instock-api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import backIcon from "../../assets/Icons/arrow_back-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import WarehouseInventoryItem from "../../components/WarehouseInventoryItem/WarehouseInventoryItem";
import TableHeader from "../../components/TableHeader/TableHeader";

function WarehouseDetailsPage() {
    const [warehouseDetails, setWarehouseDetails] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [inventoryItems, setInventoryItems] = useState([]);
    const { id } = useParams();

    const headerConfigs = [
        "INVENTORY ITEM",
        "CATEGORY",
        "STATUS",
        "QUANTITY",
        "ACTIONS",
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

    if (!warehouseDetails) {
        return (
            <div className="warehouse-details__error">No warehouse details found</div>
        );
    }

    const handleDeleteSuccess = (deletedId) => {
        setInventoryItems(prev => prev.filter(item => item.id !== deletedId));
    };
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
                <TableHeader headers={headerConfigs} />
            </div>
            <ul className="warehouse-details__list">
                {inventory.map((inventoryItem) => (
                    <li key={inventoryItem.id}>
                        <WarehouseInventoryItem 
                            inventoryItem={inventoryItem}
                            onDeleteSuccess={(deletedId) => {
                                setInventory(prevInventory => prevInventory.filter(item => item.id !== deletedId));
                            }} />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default WarehouseDetailsPage;
