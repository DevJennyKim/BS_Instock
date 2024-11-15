import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.scss";
import WarehousePage from "./pages/WarehousePage/WarehousePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import WarehouseFormPage from "./pages/WarehouseFormPage/WarehouseFormPage";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import ItemDetailsPage from "./pages/ItemDetailsPage/ItemDetailsPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import EditItemPage from "./pages/EditItemPage/EditItemPage";
import NotfoundPage from "./pages/NotfoundPage/NotfoundPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<WarehousePage />} />
            <Route path="/warehouses" element={<WarehousePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/inventory/add" element={<AddItemPage />} />
            <Route path="/inventory/:id/edit" element={<EditItemPage />} />
            <Route
              path="/warehouses/add"
              element={<WarehouseFormPage action="add" />}
            />
            <Route
              path="/warehouses/:id/edit"
              element={<WarehouseFormPage action="update" />}
            />
            <Route path="/warehouses/:id" element={<WarehouseDetailsPage />} />
            <Route path="/inventory/:id" element={<ItemDetailsPage />} />
            <Route path="*" element={<NotfoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
