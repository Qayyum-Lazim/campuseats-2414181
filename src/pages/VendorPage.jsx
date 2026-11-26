
import { useState } from 'react'
import { Link, useParams } from 'react-router'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useVendor } from '../hooks/useVendor.js'

function VendorPage() {
  const { id } = useParams()

  // Store selected category
  const [category, setCategory] = useState('All')

  // Get vendor and filtered menu from Firestore
  const { vendor, menu, loading, error } = useVendor(id, category)

  if (loading) return <Loading />

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => window.location.reload()}
      />
    )
  }

  if (!vendor) {
    return (
      <p>
        Vendor not found. <Link to="/">Back to vendors</Link>
      </p>
    )
  }

  // Each cart line must know its vendor.
  const items = menu.map((item) => ({
    ...item,
    vendorName: vendor.name,
  }))

  return (
    <section>
      <Link to="/">← All vendors</Link>

      <h2 className="section-title">
        Menu: {vendor.name}
      </h2>

      <p>{vendor.location} · {vendor.openHours}</p>

      <MenuList
        items={items}
        categories={vendor.categories ?? []}
        selectedCategory={category}
        onSelectCategory={setCategory}
      />
    </section>
  )
}

export default VendorPage
