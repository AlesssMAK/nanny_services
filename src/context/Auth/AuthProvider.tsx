import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../../service/firebase/firebase';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setUser = (user: User | null) => {
    setUserState(user);
    setUserId(user ? user.uid : null);
  };

  const clearAuth = () => {
    setUserState(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      try {
        setUser(firebaseUser);
      } catch {
        setError('Failed to load user');
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        isAuthenticated: !!user,
        loading,
        error,
        setUser,
        clearAuth,
        setLoading,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
