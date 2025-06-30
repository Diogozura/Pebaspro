'use client';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function CadastroEmail() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, senha);

      if (nome) {
        await updateProfile(result.user, { displayName: nome });
      }

      router.push('/auth/cadastro/google-info'); // mesma tela que o Google redireciona
    } catch (err: any) {
      console.error(err);
      setErro(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Criar conta com e-mail
        </Typography>

        <TextField
          label="Nome completo"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && (
          <Typography color="error" variant="body2" mt={1}>
            {erro}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={!email || !senha}
          sx={{ mt: 2 }}
        >
          Criar conta
        </Button>
      </Box>
    </Container>
  );
}
