'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function useAuth(redirectIfNotLogged = false) {
  const [user, setUser] = useState<User | null | undefined>(undefined); // undefined = carregando

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);

      if (redirectIfNotLogged && !firebaseUser) {
        window.location.href = '/auth/login';
      }
    });

    return () => unsubscribe();
  }, [redirectIfNotLogged]);

  return { user, loading: user === undefined };
}
