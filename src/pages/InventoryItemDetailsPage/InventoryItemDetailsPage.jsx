import { useParams } from "react-router-dom";

function InventoryItemsDetailsPage() {
  const { id } = useParams();
  return <div>InventoryItemsDetailsPage {id}</div>;
}

export default InventoryItemsDetailsPage;
