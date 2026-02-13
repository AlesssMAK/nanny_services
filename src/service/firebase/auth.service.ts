import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from './firebase';
import { useAuthStore } from '../store/authStore';

onAuthStateChanged(auth, user => {
  useAuthStore.getState().setUser(user || null);
});

export async function signUp(params: {
  name: string;
  email: string;
  password: string;
}): Promise<{ user: User }> {
  const { name, email, password } = params;

  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(cred.user, { displayName: name });

  useAuthStore.getState().setUser(cred.user);

  return { user: cred.user };
}

export async function signIn(params: {
  email: string;
  password: string;
}): Promise<{ user: User }> {
  const { email, password } = params;

  const cred = await signInWithEmailAndPassword(auth, email, password);

  useAuthStore.getState().setUser(cred.user);

  return { user: cred.user };
}

export async function logout(): Promise<void> {
  await signOut(auth);

  useAuthStore.getState().clearAuth();
}
