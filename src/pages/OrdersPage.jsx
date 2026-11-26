import { Link } from "react-router";
import OrderStatus from "../components/OrderStatus.jsx";
import { useMyOrders } from "../hooks/useMyOrders.js";
import OrderActions from "../components/OrderActions.jsx";

function OrdersPage() {
  const { orders, loading, error } = useMyOrders();

  if (loading) {
    return (
      <p className="muted" role="status">
        Loading orders…
      </p>
    );
  }

  if (error) {
    return (
      <p className="field-error" role="alert">
        Could not load your orders: {error}
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="card">
        <h2 className="section-title">My Orders</h2>
        <p className="muted">You have not placed any orders yet.</p>
        <Link to="/" className="btn">
          Browse vendors
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <p className="cart-name">
              {order.studentName} · {order.mahallah}
            </p>
            <p className="muted">Pickup {order.pickupTime}</p>
            <p className="muted">
              {order.items
                .map((item) => `${item.qty}× ${item.name}`)
                .join(", ")}
            </p>
            <p className="muted">
              Placed{" "}
              {order.createdAt
                ? order.createdAt.toDate().toLocaleString("en-MY")
                : "just now"}
            </p>
            <p className="price">RM {order.total.toFixed(2)}</p>
            <OrderStatus status={order.status} />
            {order.status === "Received" && <OrderActions order={order} />}
          </li>
        ))}
      </ul>
      <Link to="/" className="back-link">
        ← Browse vendors
      </Link>
    </section>
  );
}

export default OrdersPage;
