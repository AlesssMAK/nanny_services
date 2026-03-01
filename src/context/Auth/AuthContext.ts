import type { User } from 'firebase/auth';
import { createContext } from 'react';

export interface AuthContextType {
  user: User | null;
  userId: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
