import { useParams } from "react-router-dom";

function EditWarehousePage() {
  const { id } = useParams();

  return <div>EditWarehousePage {id}</div>;
}

export default EditWarehousePage;
