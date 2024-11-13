import { useParams } from "react-router-dom";

function WarehouseDetailsPage() {
  const { id } = useParams();
  return <div>WarehouseDetailsPage {id}</div>;
}

export default WarehouseDetailsPage;
