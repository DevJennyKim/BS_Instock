import { BrowserRouter, Routes } from 'react-router-dom';
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer';
import './App.scss'

function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;

