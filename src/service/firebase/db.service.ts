import axios from 'axios';

const BASE = import.meta.env.VITE_FIREBASE_DATABASE_URL;

export const api = axios.create({
  baseURL: BASE,
});

export async function getNannies() {
  const res = await api.get('/nannies.json');
  return res.data;
}

export async function getNanniesPage(startAt = 0, limit = 3) {
  const res = await api.get(
    `/nannies.json?orderBy="id"&startAt=${startAt}&limitToFirst=${limit}`
  );
  return res.data;
}

export async function addFavorite(userId: string, nannyId: string) {
  const res = await api.put(`/favorites/${userId}/${nannyId}.json`, true);
  return res.data;
}

export async function removeFavorite(userId: string, nannyId: string) {
  await api.delete(`/favorites/${userId}/${nannyId}.json`);
}
