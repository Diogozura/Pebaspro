'use client';

import {
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import React from 'react';

export default function SobreMimCard({ user }: { user: any }) {
  const [editandoSobre, setEditandoSobre] = React.useState(false);
  const [novoSobre, setNovoSobre] = React.useState(user?.sobreMim || '');

  const salvarSobre = async () => {
    await updateDoc(doc(db, 'usuarios', user.uid), { sobreMim: novoSobre });
    setEditandoSobre(false);
  };

  return (
    <Card
      sx={{
        boxShadow: 1,
        border: '1px solid #bbdefb',
        borderRadius: 2,
        p: 2,
        backgroundColor: '#f5faff',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle1" fontWeight={600}>Sobre mim</Typography>
        {!editandoSobre && (
          <IconButton size="small" onClick={() => setEditandoSobre(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {editandoSobre ? (
        <>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={novoSobre}
            onChange={(e) => setNovoSobre(e.target.value)}
          />
          <Box mt={1} display="flex" gap={1}>
            <Button variant="contained" size="small" onClick={salvarSobre}>Salvar</Button>
            <Button
              size="small"
              onClick={() => {
                setNovoSobre(user.sobreMim || '');
                setEditandoSobre(false);
              }}
            >
              Cancelar
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="body2">{user.sobreMim || 'Nenhuma informação ainda.'}</Typography>
      )}
    </Card>
  );
}
