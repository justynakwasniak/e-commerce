import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center">
      <h1>Witamy w naszej aplikacji!</h1>
      <p>Znajdź najlepsze produkty i dodaj je do swojego koszyka.</p>
      <Link to="/products" className="btn btn-primary">
        Zobacz produkty
      </Link>

      <div className="mt-5">
        <h2>Dlaczego warto?</h2>
        <ul className="list-unstyled">
          <li>🛒 Szeroki wybór produktów</li>
          <li>💸 Atrakcyjne ceny</li>
          <li>🚚 Szybka dostawa</li>
          <li>💯 Gwarancja satysfakcji</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
