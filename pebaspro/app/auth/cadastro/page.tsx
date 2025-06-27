'use client';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    senha: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui futuramente entra o cadastro com Firebase Auth e Firestore
    console.log('Dados do cadastro:', form);
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
          Criar Conta
        </Typography>
        <Typography variant="body1" mb={3}>
          Preencha os dados abaixo para continuar
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nome completo"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Telefone (WhatsApp)"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="E-mail"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Senha"
            name="senha"
            type="password"
            value={form.senha}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Button type="submit" fullWidth variant="contained">
            Cadastrar
          </Button>
        </form>

        <Typography variant="body2" mt={3}>
          Já tem conta?{' '}
          <MuiLink component={Link} href="/auth/login" underline="hover">
            Entrar
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
}
