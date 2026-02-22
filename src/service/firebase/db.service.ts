import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import type { Nanny } from '../../types/nanny';

export async function getNannies() {
  const snapshot = await getDocs(collection(db, 'nannies'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Nanny, 'id'>),
  }));
}
