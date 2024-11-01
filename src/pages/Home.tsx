import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import eshopImage from "../assets/eshop.avif.jpg";
import { FaShoppingCart, FaTags, FaTruck, FaSmile } from "react-icons/fa"; // Importujemy ikony z react-icons

const Home = () => {
  const [loading, setLoading] = useState(false); // Stan dla ładowania
  const navigate = useNavigate();

  useEffect(() => {
    const imgElement = document.querySelector(".eshop-first");
    imgElement.classList.add("visible");

    // Dodanie efektu bounce-in do ikon po załadowaniu komponentu
    const iconElements = document.querySelectorAll(".icon-home");
    iconElements.forEach((icon, index) => {
      setTimeout(() => {
        icon.classList.add("bounce-in");
      }, index * 200); // Opóźnienie animacji dla każdej ikony
    });
  }, []);

  const handleNavigate = () => {
    setLoading(true); // Ustawiamy "loading" na true po kliknięciu
    setTimeout(() => {
      navigate("/products"); // Po krótkim czasie nawigujemy na stronę produktów
    }, 100); // Można zwiększyć czas jeśli ładowanie trwa dłużej
  };

  return (
    <div className="container text-center">
      <h1>Welcome to The Everyday E-Shop!</h1>
      <h6>Find the best products and add them to your cart.</h6>

      <div className="mb-3">
        <button onClick={handleNavigate} className="btn">
          Start Shopping
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <img
        src={eshopImage}
        alt="E-Shop"
        className="eshop-first img-fluid"
        style={{ maxWidth: "100%", height: "auto", borderRadius: "50px" }} // Zmiana maxWidth na 100%
      />

      <div className="mt-5">
        <h2>Why Choose Us?</h2>
        <div className="row mt-4">
          {/* Kolumna 1 */}
          <div className="col-md-3 col-sm-6 mb-4">
            <FaShoppingCart className="icon-home" />
            <h4>Wide selection of products</h4>
            <p>Find everything you need in one place.</p>
          </div>
          {/* Kolumna 2 */}
          <div className="col-md-3 col-sm-6 mb-4">
            <FaTags className="icon-home" />
            <h4>Attractive prices</h4>
            <p>Get the best deals on the market.</p>
          </div>
          {/* Kolumna 3 */}
          <div className="col-md-3 col-sm-6 mb-4">
            <FaTruck className="icon-home" />
            <h4>Fast delivery</h4>
            <p>Your products delivered in no time.</p>
          </div>
          {/* Kolumna 4 */}
          <div className="col-md-3 col-sm-6 mb-4">
            <FaSmile className="icon-home" />
            <h4>Satisfaction guarantee</h4>
            <p>We ensure you are happy with your purchase.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
