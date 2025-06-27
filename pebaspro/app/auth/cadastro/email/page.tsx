'use client';

import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CadastroEmailPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', senha: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContinuar = () => {
    // Salvar em context/localStorage futuramente
    router.push('/auth/cadastro/informacoes');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h6" align="center">Criação da conta</Typography>
      <TextField
        fullWidth margin="normal" label="E-mail" name="email"
        value={form.email} onChange={handleChange}
      />
      <TextField
        fullWidth margin="normal" label="Senha" type="password" name="senha"
        value={form.senha} onChange={handleChange}
      />
     
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleContinuar}>
        Continuar
      </Button>
    </Container>
  );
}
