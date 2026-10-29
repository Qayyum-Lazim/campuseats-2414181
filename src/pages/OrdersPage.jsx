import useCart from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return <p className="muted">No orders yet.</p>
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="card">
          <p>
            {order.name} · {order.mahallah} · Pickup {order.pickupTime}
          </p>
          <ul>
            {order.items.map((line) => (
              <li key={line.item.id}>{line.qty} × {line.item.name}</li>
            ))}
          </ul>
          <p className="cart-total">Total: RM {order.total.toFixed(2)}</p>
        </div>
      ))}
    </section>
  )
}

export default OrdersPage