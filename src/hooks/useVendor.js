
import { useEffect, useState } from 'react'
import {
  subscribeToVendor,
  subscribeToMenu,
} from '../services/vendors.js'

// One vendor plus its category-filtered menu, both live.
export function useVendor(vendorId, category = 'All') {
  const [vendor, setVendor] = useState(undefined)
  const [menu, setMenu] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!vendorId) return undefined

    setError(null)

    const stopVendor = subscribeToVendor(
      vendorId,
      setVendor,
      (err) => setError(err.message)
    )

    const stopMenu = subscribeToMenu(
      vendorId,
      category,
      setMenu,
      (err) => setError(err.message)
    )

    // Clean up both Firestore listeners
    return () => {
      stopVendor()
      stopMenu()
    }
  }, [vendorId, category])

  return {
    vendor,
    menu,
    loading: vendor === undefined && !error,
    error,
  }
}
