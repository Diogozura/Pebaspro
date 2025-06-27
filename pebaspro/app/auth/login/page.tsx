'use client';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link as MuiLink,
  Divider,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // futuramente aqui vai o Firebase login
    router.push('/dashboard');
  };

  const handleGoogleLogin = () => {
    // aqui depois vai o login com Google
    router.push('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'center',
          backgroundColor: 'white',
        }}
      >
        <Image
          src="/logo.png"
          alt="PebasPro"
          width={100}
          height={100}
          style={{ margin: '0 auto' }}
        />

        <Typography variant="h5" mt={2} fontWeight={600}>
          PEBASPROFISSIONAIS
        </Typography>
        <Typography variant="body1" mb={3}>
          Entre na sua conta para continuar
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="E-mail"
            type="email"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mb: 2 }}
          >
            Entrar
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>OU</Divider>

        <Button
          fullWidth
          variant="contained"
          onClick={handleGoogleLogin}
          sx={{ backgroundColor: '#4285F4', color: '#fff', '&:hover': { backgroundColor: '#357ae8' } }}
        >
          Google
        </Button>

        <Typography variant="body2" mt={3}>
          Não tem cadastro?{' '}
          <MuiLink component={Link} href="/auth/cadastro" underline="hover">
            cadastre-se
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
}
