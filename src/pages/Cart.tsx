import { useCart } from "../context/useCart";
import { CartItem } from "../types/product";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
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
                className="list-group-item d-flex justify-content-between align-items-center product-cart"
                key={item.id}
              >
                <div>
                  <h5>{item.title}</h5>
                  <p>
                    Price: ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <button className="btn" onClick={() => removeFromCart(item.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <h4>Final price: ${totalPrice.toFixed(2)}</h4>
          <button className="btn" onClick={clearCart}>
            Clear cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
