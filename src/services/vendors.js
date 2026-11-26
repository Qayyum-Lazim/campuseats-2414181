import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  setDoc,
} from 'firebase/firestore'

import { db } from '../firebase.js'


// Listen to all vendors
export function subscribeToVendors(onData, onError) {
  const vendorsRef = collection(db, 'vendors')

  return onSnapshot(
    vendorsRef,
    (snapshot) => {
      const vendors = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }))

      onData(vendors)
    },
    onError
  )
}

// Listen to one vendor
export function subscribeToVendor(vendorId, onData, onError) {
  const vendorRef = doc(db, 'vendors', vendorId)

  return onSnapshot(
    vendorRef,
    (snapshot) => {
      onData(
        snapshot.exists()
          ? { id: snapshot.id, ...snapshot.data() }
          : null
      )
    },
    onError
  )
}

// Listen to menu items with category filtering
export function subscribeToMenu(vendorId, category, onData, onError) {
  const menuRef = collection(db, 'vendors', vendorId, 'menu')

  const menuQuery =
    !category || category === 'All'
      ? menuRef
      : query(
          menuRef,
          where('category', '==', category)
        )

  return onSnapshot(
    menuQuery,
    (snapshot) => {
      const menuItems = snapshot.docs.map((d) => ({
        id: d.id,
        vendorId,
        ...d.data(),
      }))

      onData(menuItems)
    },
    onError
  )
}

// Seed demo vendors and their menu items
export async function seedDemoData(vendors) {
  for (const vendor of vendors) {
    const { menu, ...vendorData } = vendor

    await setDoc(
      doc(db, 'vendors', vendor.id),
      vendorData
    )

    for (const item of menu ?? []) {
      await setDoc(
        doc(db, 'vendors', vendor.id, 'menu', item.id),
        item
      )
    }
  }
}