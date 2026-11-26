import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', [])
  const [orders, setOrders] = useLocalStorage('orders', [])

  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  function addToCart(item) {
    setCart((prev) => {
      const exists = prev.some((line) => line.item.id === item.id)
      if (exists) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prev, { item, qty: 1 }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function clearCart() {
  setCart([])
}
  function placeOrder(details) {
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cart,
      total,
      ...details,
    }
    setOrders((prev) => [order, ...prev])
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{ cart, orders, count, total, addToCart, changeQty, removeFromCart, placeOrder, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider