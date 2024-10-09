import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart"; // Importuj kontekst koszyka
import "../index.css";
import eshopLogo from "../assets/logo eshop.webp";
import { useState } from "react"; // Dodaj import useState
import { useUser } from "../context/UserContext"; // Import user context

const Navbar = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Dodaj useNavigate

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchTerm}`);
    setSearchTerm(""); // Oczyść pole wyszukiwania po przesłaniu
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Zbierz dane z formularza
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Sprawdź, czy wszystkie pola są wypełnione
    if (firstName && lastName && email && password) {
      // Pobierz aktualnych użytkowników
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Sprawdź, czy użytkownik już istnieje
      const userExists = existingUsers.some((user) => user.email === email);
      if (userExists) {
        alert("User already exists.");
        return;
      }

      // Dodaj nowego użytkownika do tablicy
      const newUser = { firstName, lastName, email, password };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers)); // Zapisz tablicę użytkowników

      console.log("User registered: ", newUser); // Dodaj logowanie

      // Zamknij modal rejestracji
      setShowRegisterModal(false);

      // Przekieruj na stronę powitalną z przekazanymi danymi
      navigate("/welcome", { state: newUser });
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Pobierz dane logowania z formularza
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Sprawdź, czy dane logowania są poprawne
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Znajdź użytkownika
    const userData = existingUsers.find(
      (user) => user.email === email && user.password === password
    );

    console.log("Logging in user: ", { email, password });
    console.log("Stored user data: ", userData); // Zaktualizowane logowanie

    if (userData) {
      // Zapisz dane użytkownika do localStorage po zalogowaniu
      localStorage.setItem("userData", JSON.stringify(userData));

      // Zamknij modal logowania
      setShowLoginModal(false);

      // Przekieruj na stronę powitalną po zalogowaniu
      navigate("/welcome", {
        state: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        },
      });
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/"); // Przekieruj na stronę główną lub stronę logowania
  };

  // Stany do kontrolowania modali
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
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
                className="form-control me-2 search-bar w-100"
                type="search"
                placeholder="Search here"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-outline-success btn-search"
                type="submit"
              >
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

      {/* Kontener pod navbar */}
      <div className="container mb-3 d-flex justify-content-end">
        <button
          className="btn btn-add me-2"
          onClick={() => setShowLoginModal(true)}
        >
          Login
        </button>
        <button
          className="btn btn-add"
          onClick={() => setShowRegisterModal(true)}
        >
          Register
        </button>
      </div>

      {/* Modal logowania */}
      <div
        className={`modal fade ${showLoginModal ? "show" : ""}`}
        style={{ display: showLoginModal ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden={!showLoginModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Login
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowLoginModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="loginEmail"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="loginPassword"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowLoginModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogin} // Dodaj wywołanie handleLogin
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal rejestracji */}
      <div
        className={`modal fade ${showRegisterModal ? "show" : ""}`}
        style={{ display: showRegisterModal ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden={!showRegisterModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">
                Register
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowRegisterModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name *
                  </label>
                  <input type="text" className="form-control" id="firstName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name *
                  </label>
                  <input type="text" className="form-control" id="lastName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email *
                  </label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password *
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm password *
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <p className="password-requirements">
                Password must contain at least one number, one uppercase and
                lowercase letter and at least 8 characters.
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowRegisterModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
