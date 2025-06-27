'use client';

import { Box, Button, Container, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';

export default function CadastroInfoPage() {
  const router = useRouter();
  const [tipoConta, setTipoConta] = useState<'cliente' | 'profissional'>('cliente');
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    profissao: '',
    documento: '',
    regiao:'',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContinuar = () => {
    // Enviar dados para backend futuramente
    router.push('/dashboard');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h6" align="center">Dados básicos</Typography>

      <Box display="flex" justifyContent="center" my={2}>
        <ToggleButtonGroup
          value={tipoConta}
          exclusive
          onChange={(e, val) => val && setTipoConta(val)}
        >
          <ToggleButton value="cliente">
            <PersonIcon sx={{ mr: 1 }} /> Cliente
          </ToggleButton>
          <ToggleButton value="profissional">
            <WorkIcon sx={{ mr: 1 }} /> Profissional
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <TextField
        fullWidth margin="normal" label="Nome" name="nome"
        value={form.nome} onChange={handleChange}
      />
      <TextField
        fullWidth margin="normal" label="Telefone / WhatsApp" name="telefone"
        value={form.telefone} onChange={handleChange}
      />
      <TextField
        fullWidth margin="normal" label="Profissão principal" name="profissao"
        value={form.profissao} onChange={handleChange}
      />
       <TextField
        fullWidth margin="normal" label="Região" name="regiao"
        value={form.regiao} onChange={handleChange}
      />
      <TextField
        fullWidth margin="normal" label="CPF / CNPJ" name="documento"
        value={form.documento} onChange={handleChange}
      />
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleContinuar}>
        Continuar
      </Button>
    </Container>
  );
}
