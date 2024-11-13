import { useParams } from "react-router-dom";

function EditItemPage() {
  const { id } = useParams();

  return <div>EditItemPage {id}</div>;
}

export default EditItemPage;
