import { useEffect, useState } from 'react';
import { subscribeToAuth } from '../../service/firebase/firebase';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  useEffect(() => {
    const unsub = subscribeToAuth(uid => {
      setUserId(uid);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);
  return (
    <AuthContext.Provider value={{ userId, authReady }}>
      {' '}
      {children}{' '}
    </AuthContext.Provider>
  );
};
