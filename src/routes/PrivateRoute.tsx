import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Auth/useAuth';
import Loader from '../components/Loader/Loader';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    <Loader />;
    return null;
  }
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
}
