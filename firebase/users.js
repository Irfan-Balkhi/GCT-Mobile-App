import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./config";
import { auth } from "./auth";

const db = getFirestore(app);

/* =========================
   CREATE EMPLOYEE
========================= */
export const createEmployee = async ({ name, email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const uid = userCredential.user.uid;

  await setDoc(doc(db, "users", uid), {
    name,
    email,
    active: true,
    createdAt: serverTimestamp(),
  });
};

/* =========================
   GET ALL USERS
========================= */
export const getAllUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
