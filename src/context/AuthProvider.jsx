import { useEffect, useState } from 'react'
import {
 createUserWithEmailAndPassword, signInWithEmailAndPassword,
 signInWithPopup, GoogleAuthProvider, signOut,
 onAuthStateChanged, updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase.js'
import { AuthContext } from './auth-context.js'
export default function AuthProvider({ children }) {
 const [user, setUser] = useState(null)
 const [loading, setLoading] = useState(true) // true until Firebase answers
 // Listen, don't ask: runs once on load and on every sign-in / sign-out.
 useEffect(() => {
 const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
 setUser(firebaseUser)
 setLoading(false)
 })
 return unsubscribe // cleanup: stop listening
 }, [])
 async function register(name, email, password) {
 const credential = await createUserWithEmailAndPassword(auth, email, password)
 await updateProfile(credential.user, { displayName: name })
 setUser({ ...credential.user, displayName: name }) // show the name at once
 }
 function login(email, password) {
 // TODO 1: return signInWithEmailAndPassword(...)
 // Hint: it takes auth, email, password (same order as Part A).
  
 return signInWithEmailAndPassword(auth, email, password)
 }
 function loginWithGoogle() {
 return signInWithPopup(auth, new GoogleAuthProvider())
 }
 function logout() {
 // TODO 2: return signOut(...) Hint: it only needs auth.
  return signOut(auth)
 }
 const value = { user, loading, register, login, loginWithGoogle, logout }
 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
