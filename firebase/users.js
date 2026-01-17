import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from './config';

const db = getFirestore(app);

export const getUserById = async (uid) => {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);

  return snap.exists() ? snap.data() : null;
};
