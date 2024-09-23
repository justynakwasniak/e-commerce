import { Link } from "react-router-dom";
import eshopImage from "../assets/eshop.avif";

const Home = () => {
  return (
    <div className="container text-center">
      <h1>Welcome to The Everyday E-Shop!</h1>
      <p>Find the best products and add them to your cart.</p>

      <div className="mb-3">
        {" "}
        {/* Kontener dla przycisku */}
        <Link to="/products" className="btn">
          View Products
        </Link>
      </div>

      <img
        src={eshopImage}
        alt="E-Shop"
        className="eshop-first img-fluid" // Klasa zapewniająca responsywność
        style={{ maxWidth: "600px", height: "auto" }}
      />

      <div className="mt-5">
        <h2>Why Choose Us?</h2>
        <ul className="list-unstyled">
          <li>Wide selection of products</li>
          <li>Attractive prices</li>
          <li>Fast delivery</li>
          <li>Satisfaction guarantee</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
