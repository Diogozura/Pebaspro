'use client';

import { auth } from '@/lib/firebase';
import { checkIfUserExists } from '@/lib/firebaseUser';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function AuthGoogle() {
  const router = useRouter();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const exists = await checkIfUserExists(user.uid);

      if (exists) {
        router.push('/dashboard');
      } else {
        router.push('/auth/cadastro/google-info'); // passo para completar dados
      }
    } catch (error) {
      console.error('Erro ao logar com Google:', error);
    }
  };

  return (
    <Button
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={handleLogin}
      fullWidth
    >
      Entrar com Google
    </Button>
  );
}
