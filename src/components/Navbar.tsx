import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import "../index.css";
import eshopLogo from "../assets/logo eshop.webp";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Load user data from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userData"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, [setUser]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchTerm}`);
    setSearchTerm(""); // Clear search input after submission
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validate input fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return showAlert("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return showAlert("Passwords do not match.");
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUsers.some((user) => user.email === email)) {
      return showAlert("User already exists.");
    }

    const newUser = { firstName, lastName, email, password };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    localStorage.setItem(`userData_${newUser.email}`, JSON.stringify(newUser));

    setUser(newUser);
    setShowRegisterModal(false);
    navigate("/welcome", { state: newUser });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const userData = JSON.parse(localStorage.getItem(`userData_${email}`));

    if (userData && userData.password === password) {
      setUser(userData);
      setShowLoginModal(false);
      navigate("/welcome", {
        state: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        },
      });
    } else {
      showAlert("Invalid email or password. Please try again.");
    }
  };

  const showAlert = (message) => {
    alert(message); // Consider using a custom alert component in the future
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUser(null); // Reset user state
    navigate("/"); // Redirect to home or login page
  };

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
                  <i className="mr-1 fa fa-shopping-cart"></i>
                  <span className="ms-1 mr-1">Shopping Cart</span>
                  {itemCount > 0 && (
                    <span className="position-absolute top-1 right-1 start-100 translate-middle badge rounded-pill counter">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mb-3 d-flex justify-content-end">
        <button
          className="btn btn-add me-2"
          onClick={() => setShowLoginModal(true)}
        >
          Login
        </button>
        <button
          className="btn btn-add me-2"
          onClick={() => setShowRegisterModal(true)}
        >
          Register
        </button>
        <button className="btn btn-add" onClick={() => navigate("/welcome")}>
          My profile
        </button>
      </div>

      {/* Overlay for background blur effect */}
      {(showLoginModal || showRegisterModal) && (
        <div className="modal-overlay" />
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <Modal title="Login" onClose={() => setShowLoginModal(false)}>
          <form onSubmit={handleLogin}>
            <InputField id="loginEmail" label="Email address" type="email" />
            <InputField id="loginPassword" label="Password" type="password" />
            <ModalFooter
              onClose={() => setShowLoginModal(false)}
              onSubmit={handleLogin}
            />
          </form>
        </Modal>
      )}

      {/* Registration Modal */}
      {showRegisterModal && (
        <Modal title="Register" onClose={() => setShowRegisterModal(false)}>
          <form onSubmit={handleRegister}>
            <InputField id="firstName" label="First Name *" type="text" />
            <InputField id="lastName" label="Last Name *" type="text" />
            <InputField id="email" label="Email *" type="email" />
            <InputField id="password" label="Password *" type="password" />
            <InputField
              id="confirmPassword"
              label="Confirm password *"
              type="password"
            />
            <p className="password-requirements">
              Password must contain at least one number, one uppercase and
              lowercase letter and at least 8 characters.
            </p>
            <ModalFooter
              onClose={() => setShowRegisterModal(false)}
              onSubmit={handleRegister}
            />
          </form>
        </Modal>
      )}
    </>
  );
};

// Modal Component
const Modal = ({ title, onClose, children }) => (
  <div
    className="modal fade show"
    style={{ display: "block" }}
    tabIndex="-1"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </div>
);

// Input Field Component
const InputField = ({ id, label, type }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input type={type} className="form-control" id={id} required />
  </div>
);

// Modal Footer Component
const ModalFooter = ({ onClose, onSubmit }) => (
  <div className="modal-footer">
    <button type="button" className="btn btn-secondary" onClick={onClose}>
      Close
    </button>
    <button type="submit" className="btn btn-primary" onClick={onSubmit}>
      Submit
    </button>
  </div>
);

export default Navbar;
