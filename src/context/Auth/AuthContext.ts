import { createContext } from 'react';
export interface AuthContextValue {
  userId: string | null;
  authReady: boolean;
}
export const AuthContext = createContext<AuthContextValue>({
  userId: null,
  authReady: false,
});
