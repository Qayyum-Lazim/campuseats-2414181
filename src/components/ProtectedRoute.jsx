import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { Loading } from './Status.jsx'
function ProtectedRoute() {
 const { user, loading } = useAuth()
 const location = useLocation()
 if (loading) return <Loading /> // check loading FIRST, or you flash /login
 if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }}
/>
 return <Outlet /> // signed in: show the page inside
}
export default ProtectedRoute