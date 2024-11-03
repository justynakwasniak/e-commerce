import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const WelcomePage = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center mb-5">
        Welcome {user ? user.firstName : "Guest"}!
      </h1>
      <ul className="sidebar-menu list-unstyled text-center">
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
          <button onClick={handleLogout} className="btn btn-add">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default WelcomePage;
