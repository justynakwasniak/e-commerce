import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Order } from "../types/product"; // Upewnij się, że ścieżka jest poprawna

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const storedOrders: Order[] = JSON.parse(
      localStorage.getItem(`orders_${user.email}`) || "[]"
    );
    setOrders(storedOrders);
  }, [user]);

  return (
    <div className="container">
      <h2>Your Order History</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div
            className="card mb-3 mx-auto"
            style={{ width: "50%" }}
            key={index}
          >
            <div className="card-body">
              <h5 className="card-title">Order #{index + 1}</h5>
              <p>
                <strong>Date:</strong> {order.date}
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Shipping Method:</strong> {order.shippingMethod}
              </p>
              <ul>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} - Quantity: {item.quantity} - Price: ${" "}
                      {item.price.toFixed(2)}
                    </li>
                  ))
                ) : (
                  <li>No items in this order.</li>
                )}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>
          {user
            ? "You have no orders."
            : "Please log in to view your order history."}
        </p>
      )}
    </div>
  );
};

export default OrderHistory;
