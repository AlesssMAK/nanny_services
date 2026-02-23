import { get, ref, remove, set } from 'firebase/database';
import type { Nanny } from '../../types/nanny';
import { realtimeDb } from './firebase';
import { getNanniesByIds } from './nannies.service';

export async function getFavoriteIds(uid: string): Promise<string[]> {
  const snap = await get(ref(realtimeDb, `users/${uid}/favorites`));
  if (!snap.exists()) return [];
  const data = snap.val() as Record<string, boolean>;
  return Object.keys(data).filter(id => data[id]);
}

export async function addToFavorites(
  uid: string,
  nannyId: string
): Promise<void> {
  await set(ref(realtimeDb, `users/${uid}/favorites/${nannyId}`), true);
}

export async function removeFromFavorites(
  uid: string,
  nannyId: string
): Promise<void> {
  await remove(ref(realtimeDb, `users/${uid}/favorites/${nannyId}`));
}

export async function toggleFavorite(
  uid: string,
  nannyId: string,
  isFavorite: boolean
): Promise<void> {
  if (isFavorite) {
    await removeFromFavorites(uid, nannyId);
  } else {
    await addToFavorites(uid, nannyId);
  }
}

export async function getFavoriteNannies(uid: string): Promise<Nanny[]> {
  const ids = await getFavoriteIds(uid);
  return getNanniesByIds(ids);
}
