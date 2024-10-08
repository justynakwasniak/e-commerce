import { useState, useEffect } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Pobierz zamówienia z localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="container">
      <h2>Your Order History</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body">
              <h5 className="card-title">Order #{index + 1}</h5>
              <p className="card-text">
                <strong>Date:</strong> {order.date}
              </p>
              <p className="card-text">
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p className="card-text">
                <strong>Shipping Method:</strong> {order.shippingMethod}
              </p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - Quantity: {item.quantity} - Price: $
                    {item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>You have no orders.</p>
      )}
    </div>
  );
};

export default OrderHistory;
