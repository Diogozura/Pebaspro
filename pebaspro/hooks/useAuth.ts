// hooks/useAuth.ts (exemplo)
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useAuth(required = false) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // 🔥 Buscar dados do Firestore
      const docRef = doc(db, "usuarios", firebaseUser.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const firestoreData = snap.data();
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          displayName: firestoreData.nome || firebaseUser.displayName,
          ...firestoreData, // adiciona telefone, cidade, etc
        });
      } else {
        setUser(firebaseUser); // fallback caso não tenha Firestore
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { user, loading };
}
