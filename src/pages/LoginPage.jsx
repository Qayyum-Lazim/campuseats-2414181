import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { authErrorMessage } from '../authErrors.js'
function LoginPage() {
 const { login, loginWithGoogle } = useAuth()
 const navigate = useNavigate()
 const location = useLocation()
 const goTo = location.state?.from ?? '/' // where the guest was going
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [error, setError] = useState('')
 const [busy, setBusy] = useState(false)
 async function handleSubmit(event) {
 event.preventDefault()
 setError('')
 setBusy(true)
 try {
 // TODO 3: await login(email, password), then navigate(goTo, { replace: true })
 await login(email, password)
 navigate(goTo, { replace: true })
 } catch (err) {
 setError(authErrorMessage(err))
 } finally {
 setBusy(false)
 }
 }
 async function handleGoogle() {
 setError('')
 try {
 // TODO 4: same as TODO 3, but await loginWithGoogle()
    await loginWithGoogle()
 } catch (err) {
 setError(authErrorMessage(err))
 }
 }
 return (
 <section className="auth-page">
 <form className="card form" onSubmit={handleSubmit}>
 <h2>Log in</h2>
 <label htmlFor="email">Email</label>
 <input id="email" type="email" value={email}
 onChange={(e) => setEmail(e.target.value)} required />
 <label htmlFor="password">Password</label>
 <input id="password" type="password" value={password}
 onChange={(e) => setPassword(e.target.value)} required />
 {error && <p className="field-error" role="alert">{error}</p>}
 <button type="submit" className="btn" disabled={busy}>
 {busy ? 'Logging in…' : 'Log in'}
 </button>
 <button type="button" className="btn btn-outline" onClick={handleGoogle}>
 Continue with Google
 </button>
 <p className="muted">No account? <Link to="/register"
state={location.state}>Register</Link></p>
 </form>
 </section>
 )
}
export default LoginPage
