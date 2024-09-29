import { useCart } from "../context/useCart";
import { CartItem } from "../types/product";
import { useNavigate } from "react-router-dom"; // Importujemy useNavigate
import { useState } from "react"; // Importujemy useState

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate(); // Inicjujemy nawigację

  const totalPrice = cart.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );

  const [discountCode, setDiscountCode] = useState(""); // Stan do przechowywania kodu rabatowego
  const [discountApplied, setDiscountApplied] = useState(false); // Stan do przechowywania informacji o zastosowaniu rabatu

  // Funkcja do nawigacji do strony płatności
  const handleProceedToPayment = () => {
    navigate("/payment");
  };

  // Funkcja do zastosowania kodu rabatowego
  const applyDiscount = () => {
    if (discountCode === "JAVASCRIPT" && !discountApplied) {
      setDiscountApplied(true);
    } else {
      alert("Invalid discount code or already applied."); // Komunikat o błędzie
    }
  };

  // Obliczanie ceny końcowej
  const finalPrice = discountApplied ? totalPrice * 0.9 : totalPrice;

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
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-add mx-1"
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

          <h4>
            Final price: ${finalPrice.toFixed(2)}
            {discountApplied && <span> (10% discount applied)</span>}
          </h4>

          <div className="mb-3">
            <div className="row">
              <div className="col-3">
                {" "}
                {/* Ustawiamy szerokość inputa na 1/4 ekranu */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
              </div>
            </div>
            <div className="col-auto">
              {" "}
              {/* Przyciski w oddzielnej kolumnie */}
              <button className="btn btn-add mt-2" onClick={applyDiscount}>
                Apply Discount
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn" onClick={clearCart}>
              Clear cart
            </button>
            <button className="btn" onClick={handleProceedToPayment}>
              Go to payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
