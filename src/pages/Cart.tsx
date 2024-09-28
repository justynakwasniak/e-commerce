import { useCart } from "../context/useCart";
import { CartItem } from "../types/product";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

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
                <div>
                  <button
                    className="btn btn-add mx-1"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1 > 0 ? item.quantity - 1 : 1
                      )
                    }
                    disabled={item.quantity === 1} // Zablokuj przycisk, gdy ilość to 1
                  >
                    -
                  </button>
                  <button
                    className="btn btn-add  mx-1"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-add mx-1"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Delete
                  </button>
                </div>
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
