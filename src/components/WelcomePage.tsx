import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const WelcomePage = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Pobierz dane użytkownika z localStorage
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  const { firstName, lastName, email } = userData;

  const handleLogout = () => {
    // Usuń dane użytkownika z localStorage
    localStorage.removeItem("userData");
    // Przekieruj na stronę główną (lub stronę logowania)
    navigate("/");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center mb-5">Welcome back, {firstName}!</h1>
      <ul className="sidebar-menu list-unstyled">
        <li>
          <Link to="/order-history">Order History</Link>
        </li>
        <li>
          <Link to="/wishlist">Wishlist</Link>
        </li>
        <li>
          <Link
            to={{
              pathname: "/account-details",
            }}
          >
            Account Details
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="btn btn-add">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default WelcomePage;
