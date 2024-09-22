import React from "react";
import { Link } from "react-router-dom";

// Definiujemy typy właściwości komponentu
interface CartButtonProps {
  itemCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount }) => {
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
