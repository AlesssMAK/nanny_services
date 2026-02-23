import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase';
import type { Nanny } from '../../types/nanny';

export async function getNannies(): Promise<Nanny[]> {
  const snapshot = await getDocs(collection(firestore, 'nannies'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Nanny, 'id'>),
  }));
}

export async function getNanniesByIds(ids: string[]): Promise<Nanny[]> {
  if (ids.length === 0) return [];
  const snaps = await Promise.all(
    ids.map(id => getDoc(doc(firestore, 'nannies', id)))
  );
  return snaps
    .filter(snap => snap.exists())
    .map(snap => ({ id: snap.id, ...(snap.data() as Omit<Nanny, 'id'>) }));
}
