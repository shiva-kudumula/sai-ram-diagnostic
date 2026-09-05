import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function GuestOnlyRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container py-5 text-center">Loading...</div>;
  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace/>;
  return children;
}
