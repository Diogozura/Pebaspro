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

export default function ContatoCard({ user, tipoConta }: { user: any; tipoConta: string }) {
  const [editandoContato, setEditandoContato] = React.useState(false);
  const [contato, setContato] = React.useState({
    whatsapp: user?.whatsapp || '',
    instagram: user?.instagram || '',
    facebook: user?.facebook || '',
    linkedin: user?.linkedin || '',
  });

  const salvarContato = async () => {
    await updateDoc(doc(db, 'usuarios', user.uid), contato);
    setEditandoContato(false);
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
        <Typography variant="subtitle1" fontWeight={600}>
          {tipoConta === 'profissional' ? 'Informações pessoais' : 'Contato'}
        </Typography>
        <IconButton size="small" onClick={() => setEditandoContato(!editandoContato)}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>

      {editandoContato ? (
        <>
          <TextField
            fullWidth
            label="WhatsApp"
            margin="dense"
            value={contato.whatsapp}
            onChange={(e) => setContato({ ...contato, whatsapp: e.target.value })}
          />
          <TextField
            fullWidth
            label="Instagram"
            margin="dense"
            value={contato.instagram}
            onChange={(e) => setContato({ ...contato, instagram: e.target.value })}
          />
          <TextField
            fullWidth
            label="Facebook"
            margin="dense"
            value={contato.facebook}
            onChange={(e) => setContato({ ...contato, facebook: e.target.value })}
          />
          <TextField
            fullWidth
            label="LinkedIn"
            margin="dense"
            value={contato.linkedin}
            onChange={(e) => setContato({ ...contato, linkedin: e.target.value })}
          />
          <TextField fullWidth label="Email" margin="dense" value={user.email} disabled />

          <Box mt={2}>
            <Button variant="contained" onClick={salvarContato}>Salvar</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="body2">WhatsApp: {user.whatsapp || 'Não informado'}</Typography>
          <Typography variant="body2">Instagram: {user.instagram || 'Não informado'}</Typography>
          <Typography variant="body2">Facebook: {user.facebook || 'Não informado'}</Typography>
          <Typography variant="body2">LinkedIn: {user.linkedin || 'Não informado'}</Typography>
          <Typography variant="body2">Email: {user.email}</Typography>
        </>
      )}
    </Card>
  );
}
