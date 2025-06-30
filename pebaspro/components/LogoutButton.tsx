'use client';

import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <Button color="inherit" onClick={handleLogout}>
      Sair
    </Button>
  );
}
