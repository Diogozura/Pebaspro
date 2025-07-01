'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';
import {
  Box, Button, Container, TextField, Typography,
} from '@mui/material';

export default function EditarPerfil() {
  const { user } = useAuth(true);
  const [perfil, setPerfil] = useState<any>({});

  useEffect(() => {
    if (user) {
      getDoc(doc(db, 'usuarios', user.uid)).then((snap) => {
        if (snap.exists()) setPerfil(snap.data());
      });
    }
  }, [user]);

  const handleSalvar = async () => {
    if (!user) return;
    await updateDoc(doc(db, 'usuarios', user.uid), perfil);
    alert('Perfil atualizado!');
  };

  if (!user) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5">Editar Perfil</Typography>
      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        value={perfil.nome || ''}
        onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
      />
      <TextField
        label="Telefone"
        fullWidth
        margin="normal"
        value={perfil.telefone || ''}
        onChange={(e) => setPerfil({ ...perfil, telefone: e.target.value })}
      />
      <TextField
        label="Área de atuação"
        fullWidth
        margin="normal"
        value={perfil.area || ''}
        onChange={(e) => setPerfil({ ...perfil, area: e.target.value })}
      />
      <TextField
        label="Região"
        fullWidth
        margin="normal"
        value={perfil.regiao || ''}
        onChange={(e) => setPerfil({ ...perfil, regiao: e.target.value })}
      />
      <Box mt={2}>
        <Button variant="contained" onClick={handleSalvar}>
          Salvar
        </Button>
      </Box>
    </Container>
  );
}
