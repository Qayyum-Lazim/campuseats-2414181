import { useState } from 'react'
import { seedDemoData } from '../services/vendors.js'
function SeedPage() {
 const [message, setMessage] = useState('')
 async function handleSeed() {
 setMessage('Seeding…')
 try {
 const res = await fetch('/api/vendors.json')
 const vendors = await res.json()
 await seedDemoData(vendors)
 setMessage(`Done: ${vendors.length} vendors written to Firestore.`)
 } catch (err) {
 setMessage(`Failed: ${err.message}`)
 }
 }
 return (
 <section className="card">
 <h2 className="section-title">Seed Firestore</h2>
 <button className="btn" onClick={handleSeed}>Load demo data</button>
 {message && <p>{message}</p>}
 </section>
 )
}
export default SeedPage