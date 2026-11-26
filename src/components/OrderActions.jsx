import { useState } from 'react'
import { changePickupTime, cancelOrder } from '../services/orders.js'
// Update and Delete for one order.
// OrdersPage shows it only while status is 'Received'.
function OrderActions({ order }) {
 const [time, setTime] = useState(order.pickupTime)
 const [error, setError] = useState('')
 async function handleSaveTime() {
 setError('')
 if (time < '07:00' || time > '22:00') {
 setError('Pickup must be between 7:00 am and 10:00 pm.')
 return
 }
 try {
 await changePickupTime(order.id, time)
 } catch (err) {
 setError(`Could not change the time: ${err.message}`)
 }
 }
 async function handleCancel() {
 const ok = window.confirm(`Cancel your order from ${order.vendorName}?`)
 if (!ok) return
 try {
 await cancelOrder(order.id)
 } catch (err) {
 setError(`Could not cancel the order: ${err.message}`)
 }
 }
 return (
 <div className="order-actions">
 <label htmlFor={`time-${order.id}`}>Pickup</label>
 <input id={`time-${order.id}`} type="time" value={time}
 onChange={(e) => setTime(e.target.value)} />
 <button type="button" className="btn btn-small" onClick={handleSaveTime}
 disabled={time === order.pickupTime}>Save time</button>
 <button type="button" className="link danger" onClick={handleCancel}>
 Cancel order
 </button>
 {error && <p className="field-error" role="alert">{error}</p>}
 </div>
 )
}
export default OrderActions
