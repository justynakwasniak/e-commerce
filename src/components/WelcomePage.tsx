import { Link, useLocation } from "react-router-dom";
import "../index.css"; // Zakładam, że tu są zapisane style

const WelcomePage = () => {
  const location = useLocation();
  const { firstName } = location.state || {}; // Odbieranie danych z nawigacji

  return (
    <div className="welcome-container">
      <h1>Welcome back, {firstName}!</h1>
      <ul className="sidebar-menu">
        <li>
          <Link to="/order-history">Order History</Link>
        </li>
        <li>
          <Link to="/wishlist">Wishlist</Link>
        </li>
        <li>
          <Link to="/account-details">Account Details</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default WelcomePage;

