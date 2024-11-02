import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import "../index.css";
import eshopLogo from "../assets/logo eshop.webp";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const savedUser = JSON.parse(savedUserData);
      setUser(savedUser);
    }
  }, [setUser]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate(`/products?search=${searchTerm}`);
    setSearchTerm(""); // Clear search input after submission
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const firstNameElement = document.getElementById(
      "firstName"
    ) as HTMLInputElement | null;
    const lastNameElement = document.getElementById(
      "lastName"
    ) as HTMLInputElement | null;
    const emailElement = document.getElementById(
      "email"
    ) as HTMLInputElement | null;
    const passwordElement = document.getElementById(
      "password"
    ) as HTMLInputElement | null;
    const confirmPasswordElement = document.getElementById(
      "confirmPassword"
    ) as HTMLInputElement | null;

    if (
      !firstNameElement ||
      !lastNameElement ||
      !emailElement ||
      !passwordElement ||
      !confirmPasswordElement
    ) {
      return showAlert("Please fill in all fields.");
    }

    const firstName = firstNameElement.value;
    const lastName = lastNameElement.value;
    const email = emailElement.value;
    const password = passwordElement.value;
    const confirmPassword = confirmPasswordElement.value;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return showAlert("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return showAlert("Passwords do not match.");
    }

    const existingUsersString = localStorage.getItem("users");
    const existingUsers = existingUsersString
      ? JSON.parse(existingUsersString)
      : [];
    if (existingUsers.some((user: { email: string }) => user.email === email)) {
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

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const emailElement = document.getElementById(
      "loginEmail"
    ) as HTMLInputElement | null;
    const passwordElement = document.getElementById(
      "loginPassword"
    ) as HTMLInputElement | null;

    if (!emailElement || !passwordElement) {
      showAlert("Please fill in all fields.");
      return;
    }

    const email = emailElement.value;
    const password = passwordElement.value;

    if (!email || !password) {
      showAlert("Please fill in all fields.");
      return;
    }

    const userDataString = localStorage.getItem(`userData_${email}`);
    const userData = userDataString ? JSON.parse(userDataString) : null;

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

  const showAlert = (message: string): void => {
    alert(message); // Consider using a custom alert component in the future
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
interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => (
  <div
    className="modal fade show"
    style={{ display: "block" }}
    tabIndex={-1}
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
interface InputFieldProps {
  id: string;
  label: string;
  type: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input type={type} className="form-control" id={id} required />
  </div>
);

// Modal Footer Component
// ModalFooter Component
interface ModalFooterProps {
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // keep the same type for onSubmit
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose }) => (
  <div className="modal-footer">
    <button type="button" className="btn btn-secondary" onClick={onClose}>
      Close
    </button>
    {/* Removed onClick from here */}
    <button type="submit" className="btn btn-primary">
      Login
    </button>
  </div>
);

export default Navbar;
