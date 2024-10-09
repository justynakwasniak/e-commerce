import { useState } from "react"; // Import useState
import { useCart } from "../context/useCart"; // Import cart context
import { useUser } from "../context/UserContext"; // Import user context
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Payment = () => {
  const { cart, clearCart } = useCart(); // Get products from cart and function to clear it
  const { user } = useUser(); // Access user context
  const navigate = useNavigate();

  // States to store selected payment and shipping methods
  const [paymentMethod, setPaymentMethod] = useState("credit-card"); // Default value
  const [shippingMethod, setShippingMethod] = useState("standard"); // Default value

  const handlePayment = () => {
    if (!user) {
      alert("Please log in to proceed with payment."); // Alert if user is not logged in
      return;
    }

    const userEmail = user.email; // Get logged-in user's email from context

    // Get existing orders for this user from localStorage
    const existingOrders =
      JSON.parse(localStorage.getItem(`orders_${userEmail}`)) || [];

    // Determine payment and shipping method names based on selection
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

    // Create new order
    const newOrder = {
      items: cart,
      date: new Date().toLocaleString(),
      paymentMethod: paymentMethodName,
      shippingMethod: shippingMethodName,
    };

    // Add new order to the orders array
    existingOrders.push(newOrder);

    // Save updated orders array in localStorage for the specific user
    localStorage.setItem(`orders_${userEmail}`, JSON.stringify(existingOrders));

    // Clear the cart and redirect the user to order history
    clearCart();
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
            onChange={(e) => setPaymentMethod(e.target.value)} // Update state based on selection
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
            onChange={(e) => setShippingMethod(e.target.value)} // Update state based on selection
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
