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
import AuthGoogle from '../../../components/AuthGoogle';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // futuramente aqui vai o Firebase login
    router.push('/perfil');
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
          disabled
            fullWidth
            label="E-mail"
            type="email"
            variant="outlined"
            
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            disabled
            type="submit"
            variant="contained"
            sx={{ mb: 2 }}
          >
            Entrar
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>OU</Divider>

      <AuthGoogle />

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
