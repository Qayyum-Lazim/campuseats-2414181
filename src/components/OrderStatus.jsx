const STEPS = ['Received', 'Preparing', 'Ready', 'Collected']
function OrderStatus({ status }) {
 const index = STEPS.indexOf(status)
 return (
 <ol className="status-steps" aria-label={`Status: ${status}`}>
 {STEPS.map((step, i) => <li key={step} className={i <= index ? 'done' :
''}>{step}</li>)}
 </ol>
 )
}
export default OrderStatus
