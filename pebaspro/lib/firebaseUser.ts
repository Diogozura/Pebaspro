import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function checkIfUserExists(uid: string) {
  const docRef = doc(db, 'usuarios', uid);
  const snapshot = await getDoc(docRef);
  return snapshot.exists();
}

export async function createUser(uid: string, data: any) {
  const docRef = doc(db, 'usuarios', uid);
  await setDoc(docRef, data);
}

