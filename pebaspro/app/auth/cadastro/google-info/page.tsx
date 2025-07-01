'use client';

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { createUser } from '@/lib/firebaseUser';
import { useRouter } from 'next/navigation';

export default function GoogleInfoPage() {
  const [dados, setDados] = useState({
    nome: '',
    telefone: '',
    cidade: '',
    tipoConta: '', // 'profissional' ou 'empresa'
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as string;
    setDados({ ...dados, [name]: event.target.value as string });
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (!user) return;

    await createUser(user.uid, {
      ...dados,
      email: user.email,
      uid: user.uid,
      createdAt: new Date().toISOString(),
    });

    router.push('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Complete seu cadastro
        </Typography>

        <TextField
          label="Nome completo"
          name="nome"
          fullWidth
          margin="normal"
          value={dados.nome}
          onChange={handleChange}
        />

        <TextField
          label="Telefone"
          name="telefone"
          fullWidth
          margin="normal"
          value={dados.telefone}
          onChange={handleChange}
        />

        <TextField
          label="Cidade"
          name="cidade"
          fullWidth
          margin="normal"
          value={dados.cidade}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="tipoConta-label">Tipo de Conta</InputLabel>
          <Select
            labelId="tipoConta-label"
            name="tipoConta"
            value={dados.tipoConta}
            label="Tipo de Conta"
            onChange={(event) =>
              setDados({ ...dados, tipoConta: event.target.value as string })
            }
          >
            <MenuItem value="profissional">Profissional</MenuItem>
            <MenuItem value="empresa">Empresa</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={!dados.nome || !dados.telefone || !dados.tipoConta}
        >
          Continuar
        </Button>
      </Box>
    </Container>
  );
}
