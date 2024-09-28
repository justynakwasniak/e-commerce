import { useNavigate } from "react-router-dom";
import { useState } from "react";
import eshopImage from "../assets/eshop.avif";

const Home = () => {
  const [loading, setLoading] = useState(false); // Stan dla ładowania
  const navigate = useNavigate();

  const handleNavigate = () => {
    setLoading(true); // Ustawiamy "loading" na true po kliknięciu
    setTimeout(() => {
      navigate("/products"); // Po krótkim czasie nawigujemy na stronę produktów
    }, 500); // Można zwiększyć czas jeśli ładowanie trwa dłużej
  };

  return (
    <div className="container text-center">
      <h1>Welcome to The Everyday E-Shop!</h1>
      <h6>Find the best products and add them to your cart.</h6>

      <div className="mb-3">
        {/* Przycisk, który przenosi na stronę produktów */}
        <button onClick={handleNavigate} className="btn">
          View Products
        </button>
      </div>

      {/* Loader, który wyświetla się po kliknięciu */}
      {loading && <p>Loading...</p>}

      <img
        src={eshopImage}
        alt="E-Shop"
        className="eshop-first img-fluid"
        style={{ maxWidth: "600px", height: "auto" }}
      />

      <div className="mt-5">
        <h2>Why Choose Us?</h2>
        <ul className="list-unstyled">
          <h4>Wide selection of products</h4>
          <h4>Attractive prices</h4>
          <h4>Fast delivery</h4>
          <h4>Satisfaction guarantee</h4>
        </ul>
      </div>
    </div>
  );
};

export default Home;
