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

export default function CertificacoesCard({
  user,
}: {
  user: any;
}) {
  const [editandoCertificacoes, setEditandoCertificacoes] = React.useState(false);
  const [certificacoes, setCertificacoes] = React.useState<any[]>(user?.certificacoes || []);

  const salvarCertificacoes = async () => {
    await updateDoc(doc(db, 'usuarios', user.uid), { certificacoes });
    setEditandoCertificacoes(false);
  };

  if (user?.tipoConta !== 'profissional') return null;

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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" fontWeight={600}>
          Certificações
        </Typography>
        <IconButton size="small" onClick={() => setEditandoCertificacoes(!editandoCertificacoes)}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>

      {editandoCertificacoes ? (
        <>
          {certificacoes.map((cert, idx) => (
            <Card
              key={idx}
              variant="outlined"
              sx={{ mb: 2, p: 2, background: '#fff' }}
            >
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Curso"
                  value={cert.nome}
                  onChange={(e) => {
                    const nova = [...certificacoes];
                    nova[idx].nome = e.target.value;
                    setCertificacoes(nova);
                  }}
                />
                <TextField
                  label="Instituição"
                  value={cert.instituicao || ''}
                  onChange={(e) => {
                    const nova = [...certificacoes];
                    nova[idx].instituicao = e.target.value;
                    setCertificacoes(nova);
                  }}
                />
                <TextField
                  label="Data"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={cert.data}
                  onChange={(e) => {
                    const nova = [...certificacoes];
                    nova[idx].data = e.target.value;
                    setCertificacoes(nova);
                  }}
                />
                <Button
                  color="error"
                  onClick={() => {
                    const nova = certificacoes.filter((_, i) => i !== idx);
                    setCertificacoes(nova);
                  }}
                >
                  Remover
                </Button>
              </Box>
            </Card>
          ))}

          <Box display="flex" gap={1} flexWrap="wrap">
            <Button
              variant="outlined"
              onClick={() =>
                setCertificacoes([...certificacoes, { nome: '', instituicao: '', data: '' }])
              }
            >
              + Adicionar nova certificação
            </Button>
            <Button variant="contained" onClick={salvarCertificacoes}>
              Salvar todas
            </Button>
            <Button onClick={() => setEditandoCertificacoes(false)}>Cancelar</Button>
          </Box>
        </>
      ) : (
        <>
          {user.certificacoes?.length ? (
            user.certificacoes.map((cert: any, idx: number) => (
              <Card key={idx} variant="outlined" sx={{ mb: 2, p: 2 }}>
                <Typography variant="body2" fontWeight={600}>
                  {cert.nome}
                </Typography>
                <Typography variant="body2">
                  {cert.instituicao} —{' '}
                  {cert.data ? new Date(cert.data).toLocaleDateString('pt-BR') : 'Data não informada'}
                </Typography>
              </Card>
            ))
          ) : (
            <Typography variant="body2">Nenhuma certificação cadastrada.</Typography>
          )}
        </>
      )}
    </Card>
  );
}
