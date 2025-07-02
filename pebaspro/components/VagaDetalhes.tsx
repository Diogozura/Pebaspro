'use client';
import { Box, Button, Typography, Stack } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/lib/firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function VagaDetalhes({ vaga }: { vaga: any }) {
  const { user } = useAuth();
  const isProfissional = user?.tipoConta === 'profissional';
  const [jaCandidatou, setJaCandidatou] = useState(false);

  const params = useParams();
  const vagaId = vaga?.id || (typeof params?.id === 'string' ? params.id : '');
console.log('Vaga ID:', vagaId);
  useEffect(() => {
    const verificar = async () => {
      if (!user || !vagaId) return;
      const ref = doc(db, 'usuarios', user.uid, 'candidaturas', vagaId);
      const snap = await getDoc(ref);
      setJaCandidatou(snap.exists());
    };
    verificar();
  }, [user, vagaId]);

  const handleCandidatar = async () => {
    if (!user || !vagaId) return;

    try {
      await Promise.all([
        setDoc(doc(db, 'vagas', vagaId, 'candidaturas', user.uid), {
          data: serverTimestamp(),
          nome: user.displayName || user.nome || 'Profissional',
          uid: user.uid,
        }),
        setDoc(doc(db, 'usuarios', user.uid, 'candidaturas', vagaId), {
          data: serverTimestamp(),
          titulo: vaga.titulo,
          vagaId,
        }),
      ]);
      alert('Candidatura registrada com sucesso!');
      setJaCandidatou(true);
    } catch (err) {
      console.error(err);
      alert('Erro ao se candidatar.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>{vaga.titulo}</Typography>
      <Typography variant="body1" gutterBottom><strong>Descrição:</strong> {vaga.descricao}</Typography>
      <Typography variant="body1"><strong>Requisitos:</strong> {vaga.requisitos}</Typography>
      <Typography variant="body1"><strong>Benefícios:</strong> {vaga.beneficios}</Typography>
      <Typography variant="body1"><strong>Salário:</strong> {vaga.salario}</Typography>
      <Typography variant="body1"><strong>Local:</strong> {vaga.local}</Typography>
      <Typography variant="body1"><strong>Modalidade:</strong> {vaga.modalidade}</Typography>
      <Typography variant="body1"><strong>Jornada:</strong> {vaga.jornada}</Typography>
      <Typography variant="body1"><strong>WhatsApp:</strong> {vaga.whatsapp}</Typography>
      <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
        Publicado em: {new Date(vaga.dataPublicacao).toLocaleDateString()}
      </Typography>

      {isProfissional && (
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          disabled={jaCandidatou}
          onClick={handleCandidatar}
        >
          {jaCandidatou ? 'Já Candidatado' : 'Candidatar-se'}
        </Button>
      )}
    </Box>
  );
}
