'use client';

import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { db } from '@/lib/firebase';
import { collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';
import LogoutButton from '@/components/LogoutButton';
import React from 'react';
import { useRouter } from 'next/navigation';
import CardProfissional from '@/components/CardProfissional';
import PerfilPrincipal from './perfilPrincipal';
import ContatoCard from './contato';
import SobreMimCard from './sobre';
import CertificacoesCard from './certificado';
import MinhasCandidaturasCard from './minhaCandidatura';
import VagasCriadasCard from './vagasCriadas';

export default function Perfil() {
  const { user, loading } = useAuth(true);
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [loading, user, router]);

  const [editandoSobre, setEditandoSobre] = React.useState(false);
  const [novoSobre, setNovoSobre] = React.useState(user?.sobreMim || '');

  const [editandoCertificacoes, setEditandoCertificacoes] = React.useState(false);
  const [certificacoes, setCertificacoes] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (user?.certificacoes) {
      setCertificacoes(user.certificacoes);
    }
  }, [user]);
  const [vagasCriadas, setVagasCriadas] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!user || tipoConta !== 'empresa') return;

    const fetch = async () => {
      const ref = collection(db, 'vagas');
      const q = query(ref);
      const snap = await getDocs(q);
      const minhas = snap.docs
        .filter(d => d.data().criadoPor?.uid === user.uid)
        .map(d => ({ id: d.id, ...d.data() }));
      setVagasCriadas(minhas);
    };
    fetch();
  }, [user]);
  const [candidatosPorVaga, setCandidatosPorVaga] = React.useState<{ [key: string]: any[] }>({});

  React.useEffect(() => {
    const buscarCandidatos = async () => {
      const resultado: { [key: string]: any[] } = {};

      for (const vaga of vagasCriadas) {
        const ref = collection(db, 'vagas', vaga.id, 'candidaturas');
        const q = query(ref, orderBy('data', 'desc'));
        const snap = await getDocs(q);
        resultado[vaga.id] = snap.docs.map(d => ({
          uid: d.id,
          ...d.data(),
        }));
      }

      setCandidatosPorVaga(resultado);
    };

    if (vagasCriadas.length) {
      buscarCandidatos();
    }
  }, [vagasCriadas]);
  const tipoConta = user?.tipoConta as 'empresa' | 'profissional';
  

  const [candidaturas, setCandidaturas] = React.useState<any[]>([]);
 

  React.useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const ref = collection(db, 'usuarios', user.uid, 'candidaturas');
      const q = query(ref, orderBy('data', 'desc'));
      const snap = await getDocs(q);
      const lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setCandidaturas(lista);
    };
    fetch();
  }, [user]);

  if (loading) return null;

  if (loading || !user) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }





  const salvarCertificacoes = async () => {
    await updateDoc(doc(db, 'usuarios', user.uid), { certificacoes });
    setEditandoCertificacoes(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>

        {/* Perfil principal */}
      <PerfilPrincipal user={user} />


        {/* Contato */}
        <ContatoCard user={user} tipoConta={tipoConta} />

        {/* Sobre mim */}
       <SobreMimCard user={user} />

        {/* Certificações */}
       <CertificacoesCard user={user} />

        {/* candidaturas */}
      <MinhasCandidaturasCard user={user} />
        {/* Vagas para empresa */}
       {tipoConta === 'empresa' && <VagasCriadasCard user={user} />}

      </Stack>
    </Container>
  );
}
