import { useState } from "react"; // Importuj useState
import { useCart } from "../context/useCart"; // Importuj kontekst koszyka
import { useNavigate } from "react-router-dom"; // Importuj useNavigate

const Payment = () => {
  const { cart, clearCart } = useCart(); // Pobierz produkty z koszyka i funkcję do jego czyszczenia
  const navigate = useNavigate();

  // Stany do przechowywania wybranych metod płatności i dostawy
  const [paymentMethod, setPaymentMethod] = useState("credit-card"); // Domyślna wartość
  const [shippingMethod, setShippingMethod] = useState("standard"); // Domyślna wartość

  const handlePayment = () => {
    // Pobierz istniejące zamówienia z localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Określenie nazw metod płatności i dostawy na podstawie wyboru
    const paymentMethodName =
      paymentMethod === "credit-card"
        ? "Credit Card"
        : paymentMethod === "paypal"
        ? "PayPal"
        : "Blik";
    const shippingMethodName =
      shippingMethod === "standard"
        ? "InPost Parcel Locker"
        : "Standard Courier";

    // Stwórz nowe zamówienie z koszyka i daty zamówienia
    const newOrder = {
      items: cart,
      date: new Date().toLocaleString(), // Data zamówienia
      paymentMethod: paymentMethodName, // Wybrana metoda płatności
      shippingMethod: shippingMethodName, // Wybrana metoda dostawy
    };

    // Dodaj nowe zamówienie do tablicy zamówień
    existingOrders.push(newOrder);

    // Zapisz zaktualizowaną tablicę zamówień w localStorage
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Wyczyść koszyk
    clearCart();

    // Przekieruj użytkownika do zakładki "Order History"
    navigate("/order-history");
  };

  return (
    <div className="container">
      <h2>Payment & Shipping</h2>

      <div className="row">
        {/* Select Payment Method */}
        <div className="col-md-3 col-sm-6 mb-3">
          <h6>Select Payment Method</h6>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)} // Aktualizowanie stanu na podstawie wyboru
          >
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="blik">Blik</option>
          </select>
        </div>
      </div>

      <div className="row mt-3">
        {/* Select Shipping Method */}
        <div className="col-md-3 col-sm-6 mb-3">
          <h6>Select Shipping Method</h6>
          <select
            className="form-select"
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)} // Aktualizowanie stanu na podstawie wyboru
          >
            <option value="standard">InPost Parcel Locker - $3</option>
            <option value="express">Standard Courier - $5</option>
          </select>
        </div>
      </div>

      <button className="btn btn-add mt-4" onClick={handlePayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default Payment;
