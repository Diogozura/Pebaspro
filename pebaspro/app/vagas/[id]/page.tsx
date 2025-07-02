'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import VagaForm from '@/components/VagaForm';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function VisualizarVagaPage() {
  const { id } = useParams();
  const [vaga, setVaga] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const buscarVaga = async () => {
      try {
        const ref = doc(db, 'vagas', String(id));
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const dados = snap.data();
          setVaga({
            ...dados,
            dataPublicacao: dados.dataPublicacao
              ? new Date(dados.dataPublicacao).toLocaleDateString('pt-BR')
              : '',
          });
        } else {
          setErro('Vaga não encontrada');
        }
      } catch (e) {
        console.error('Erro ao buscar vaga:', e);
        setErro('Erro ao buscar vaga');
      } finally {
        setCarregando(false);
      }
    };

    buscarVaga();
  }, [id]);

  if (carregando) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (erro) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">{erro}</Typography>
      </Box>
    );
  }

  return <VagaForm modo="visualizar" vaga={vaga} />;
}
