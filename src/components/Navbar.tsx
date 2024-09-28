import { Link } from "react-router-dom";
import { useCart } from "../context/useCart"; // Importuj kontekst koszyka
import "../index.css";
import eshopLogo from "../assets/logo eshop.webp";
import { useState } from "react"; // Dodaj import useState

const Navbar = () => {
  const { cart } = useCart(); // Uzyskaj dostęp do koszyka
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0); // Oblicz całkowitą ilość produktów
  const [searchTerm, setSearchTerm] = useState(""); // Dodaj stan dla wyszukiwania

  const handleSearch = (e) => {
    e.preventDefault();
    // Tu możesz dodać logikę do wyszukiwania produktów, np. przekierowanie do strony wyszukiwania
    console.log("Szukam:", searchTerm);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img className="logoEshop" src={eshopLogo} alt="logo e-shop" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Ustawienie stanu na wartość pola
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link position-relative d-flex align-items-center"
                to="/cart"
              >
                <i className="fa fa-shopping-cart"></i>
                <span className="ms-1">Shopping Cart</span>
                {itemCount > 0 && (
                  <span className="position-absolute start-100 translate-middle badge rounded-pill counter">
                    {itemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
