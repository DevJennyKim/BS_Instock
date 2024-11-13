import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.scss";
import WarehousePage from "./pages/WarehousePage/WarehousePage";
import Inventory from './components/Inventory/Inventory';


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<WarehousePage />} />
            <Route path ='/inventory' element = {<Inventory />}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
