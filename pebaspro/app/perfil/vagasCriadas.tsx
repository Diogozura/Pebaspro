'use client';

import {
  Box,
  Card,
  CircularProgress,
  Link,
  Typography,
} from '@mui/material';
import { collection, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import React from 'react';

export default function VagasCriadasCard({ user }: { user: any }) {
  const [vagasCriadas, setVagasCriadas] = React.useState<any[]>([]);
  const [candidatosPorVaga, setCandidatosPorVaga] = React.useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user || user.tipoConta !== 'empresa') return;

    const fetch = async () => {
      const ref = collection(db, 'vagas');
      const q = query(ref);
      const snap = await getDocs(q);
      const minhas = snap.docs
        .filter((d) => d.data().criadoPor?.uid === user.uid)
        .map((d) => ({ id: d.id, ...d.data() }));
      setVagasCriadas(minhas);
    };
    fetch();
  }, [user]);

  React.useEffect(() => {
    const buscarCandidatos = async () => {
      const resultado: { [key: string]: any[] } = {};

      for (const vaga of vagasCriadas) {
        const ref = collection(db, 'vagas', vaga.id, 'candidaturas');
        const q = query(ref, orderBy('data', 'desc'));
        const snap = await getDocs(q);
        resultado[vaga.id] = snap.docs.map((d) => ({
          uid: d.id,
          ...d.data(),
        }));
      }

      setCandidatosPorVaga(resultado);
      setLoading(false);
    };

    if (vagasCriadas.length) {
      buscarCandidatos();
    }
  }, [vagasCriadas]);

  if (!user || user.tipoConta !== 'empresa') return null;

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600}>
        Vagas de empregos criadas
      </Typography>
      <Link href="/vagas/criar" underline="hover">
        Criar vaga
      </Link>

      {loading ? (
        <Box mt={2}>
          <CircularProgress size={24} />
        </Box>
      ) : vagasCriadas.length === 0 ? (
        <Typography variant="body2" mt={2}>
          Nenhuma vaga criada até o momento.
        </Typography>
      ) : (
        vagasCriadas.map((vaga) => (
          <Card key={vaga.id} sx={{ p: 2, my: 2, backgroundColor: '#f5faff', border: '1px solid #bbdefb' }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {vaga.titulo}
            </Typography>
            <Typography variant="body2">
              Criada em:{' '}
              {vaga.dataPublicacao?.toDate
                ? new Date(vaga.dataPublicacao.toDate()).toLocaleDateString('pt-BR')
                : '---'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de candidatos: {candidatosPorVaga[vaga.id]?.length || 0}
            </Typography>

            {candidatosPorVaga[vaga.id]?.map((c) => (
              <Box key={c.uid} sx={{ mt: 1, pl: 2 }}>
                <Typography variant="body2">👤 {c.nome}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Data:{' '}
                  {c.data?.toDate
                    ? new Date(c.data.toDate()).toLocaleDateString('pt-BR')
                    : '---'}
                </Typography>
                <Link href={`/perfil/${c.uid}`} underline="hover">
                  Ver perfil
                </Link>
              </Box>
            ))}
          </Card>
        ))
      )}
    </Box>
  );
}
