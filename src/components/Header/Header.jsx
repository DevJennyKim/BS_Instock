import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import InStockLogo from "../../assets/Logo/InStock-Logo_2x.png";

function Header() {
    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__logo">
                    <Link to="/">
                        <img
                            src={InStockLogo}
                            alt="In Stock Logo"
                            className="header__instock"
                        />
                    </Link>
                </div>
            </div>
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-item">
                        <NavLink 
                            to="/warehouses" 
                            className={({ isActive }) => 
                                `header__nav-link ${isActive ? "header__nav-link--active" : ""}`
                            }
                        >
                            Warehouses
                        </NavLink>
                    </li>
                    <li className="header__nav-item">
                        <NavLink 
                            to="/inventory"
                            className={({ isActive }) => 
                                `header__nav-link ${isActive ? "header__nav-link--active" : ""}`
                            }
                        >
                            Inventory
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}


export default Header;