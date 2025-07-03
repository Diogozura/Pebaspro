'use client';

import {
  Box,
  Card,
  CircularProgress,
  Link,
  Typography,
} from '@mui/material';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import React from 'react';

export default function MinhasCandidaturasCard({ user }: { user: any }) {
  const [candidaturas, setCandidaturas] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user) return;

    const fetch = async () => {
      const ref = collection(db, 'usuarios', user.uid, 'candidaturas');
      const q = query(ref, orderBy('data', 'desc'));
      const snap = await getDocs(q);
      const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setCandidaturas(lista);
      setLoading(false);
    };

    fetch();
  }, [user]);

  if (!user || user?.tipoConta !== 'profissional') return null;

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
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Vagas que me candidatei
      </Typography>

      {loading ? (
        <CircularProgress size={20} />
      ) : candidaturas.length === 0 ? (
        <Typography variant="body2">
          Você ainda não se candidatou a nenhuma vaga.
        </Typography>
      ) : (
        candidaturas.map((vaga) => (
          <Box key={vaga.id} sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight={600}>
              {vaga.titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Data:{' '}
              {vaga.data?.toDate
                ? new Date(vaga.data.toDate()).toLocaleDateString('pt-BR')
                : '---'}
            </Typography>
            <Link href={`/vagas/${vaga.id}`} underline="hover">
              Ver detalhes da vaga
            </Link>
          </Box>
        ))
      )}
    </Card>
  );
}
