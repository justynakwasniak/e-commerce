import React, { useContext } from "react";
import CartContext from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext); // Zmiana 'cartItems' na 'cart'

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={item.id}
              >
                <div>
                  <h5>{item.title}</h5>
                  <p>
                    Price: ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <h4>Final price: ${totalPrice.toFixed(2)}</h4>
          <button className="btn btn-danger" onClick={clearCart}>
            Clear cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
