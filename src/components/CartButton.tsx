import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart"; // Importuj useCart

const CartButton: React.FC = () => {
  const { cart } = useCart(); // Pobierz koszyk z kontekstu
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0); // Oblicz liczbę przedmiotów w koszyku

  return (
    <Link to="/cart" className="btn btn-primary position-relative">
      Shopping Cart
      {itemCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
