import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

const CartButton: React.FC = () => {
  const { cart } = useCart(); 
  const itemCount = cart.reduce(
    (total: number, item: { quantity: number }) => total + item.quantity,
    0
  );

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
