import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';
import TablePage from './pages/TablePage/TablePage';
import WarehouseFormPage from './pages/WarehouseFormPage/WarehouseFormPage';
import WarehouseDetailsPage from './pages/WarehouseDetailsPage/WarehouseDetailsPage';
import InventoryItemFormPage from './pages/InventoryItemFormPage/InventoryItemFormPage';
import ItemDetailsPage from './pages/ItemDetailsPage/ItemDetailsPage';
import NotfoundPage from './pages/NotfoundPage/NotfoundPage';
import ScrollToTop from './utils/scrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<TablePage page="warehouses" />} />
            <Route
              path="/warehouses"
              element={<TablePage page="warehouses" />}
            />
            <Route path="/inventory" element={<TablePage page="inventory" />} />
            <Route
              path="/inventory/add"
              element={<InventoryItemFormPage action="add" />}
            />
            <Route
              path="/inventory/:id/edit"
              element={<InventoryItemFormPage action="update" />}
            />
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
