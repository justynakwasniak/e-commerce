import { useState } from "react";
import { useCart } from "../context/useCart";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { cart, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [showModal, setShowModal] = useState(false);

  const handlePayment = () => {
    if (!user) {
      alert("Please log in to proceed with payment.");
      return;
    }

    const userEmail = user.email;
    const existingOrders = JSON.parse(
      localStorage.getItem(`orders_${userEmail}`) || "[]"
    );

    const paymentMethodName = getPaymentMethodName(paymentMethod);
    const shippingMethodName = getShippingMethodName(shippingMethod);

    const newOrder = {
      items: cart,
      date: new Date().toLocaleString(),
      paymentMethod: paymentMethodName,
      shippingMethod: shippingMethodName,
    };

    existingOrders.push(newOrder);
    localStorage.setItem(`orders_${userEmail}`, JSON.stringify(existingOrders));

    clearCart();
    setShowModal(true); // Show the success modal
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "credit-card":
        return "Credit Card";
      case "paypal":
        return "PayPal";
      case "blik":
        return "Blik";
      default:
        return "Unknown Method";
    }
  };

  const getShippingMethodName = (method: string) => {
    switch (method) {
      case "standard":
        return "InPost Parcel Locker - $3";
      case "express":
        return "Standard Courier - $5";
      default:
        return "Unknown Shipping Method";
    }
  };

  return (
    <div className="container">
      <h2>Payment & Shipping</h2>
      <div className="row">
        <div className="col-md-3 col-sm-6 mb-3">
          <h6>Select Payment Method</h6>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="blik">Blik</option>
          </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-3 col-sm-6 mb-3">
          <h6>Select Shipping Method</h6>
          <select
            className="form-select"
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
          >
            <option value="standard">InPost Parcel Locker - $3</option>
            <option value="express">Standard Courier - $5</option>
          </select>
        </div>
      </div>
      <button className="btn btn-add mt-4" onClick={handlePayment}>
        Complete the transaction
      </button>

      {/* Modal for success message */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }} // Make sure modal is visible
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thank You!</h5>
              </div>
              <div className="modal-body">
                <p>
                  Your order has been successfully placed! Thank you for
                  shopping with us!
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    navigate("/order-history"); // Navigate after closing
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
