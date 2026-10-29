import { useParams } from 'react-router'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useVendors } from '../hooks/useVendors.js'

function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((v) => v.id === id)
  if (!vendor) return <p>Vendor not found</p>

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <MenuList items={vendor.menu} />
    </section>
  )
}

export default VendorPage