'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TodayIcon from '@mui/icons-material/Today';
import BusinessIcon from '@mui/icons-material/Business';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { collection, addDoc, serverTimestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function VagaDetalhes({ vaga }: { vaga: any }) {
  const router = useRouter();
  const { user } = useAuth();
  const isProfissional = user?.tipoConta === 'profissional';
  const [jaCandidatou, setJaCandidatou] = React.useState(false);

  // Checa se o profissional já se candidatou
  React.useEffect(() => {
    const checkCandidatura = async () => {
      if (!user || !vaga?.id) return;
      const ref = doc(db, 'usuarios', user.uid, 'candidaturas', vaga.id);
      const snap = await getDoc(ref);
      setJaCandidatou(snap.exists());
    };
    checkCandidatura();
  }, [user, vaga?.id]);

  // Função para se candidatar
  const handleCandidatar = async () => {
    if (!user || !vaga?.id) return;
    const vagaRef = doc(db, 'vagas', vaga.id, 'candidaturas', user.uid);
    const usuarioRef = doc(db, 'usuarios', user.uid, 'candidaturas', vaga.id);

    const candidato = {
      uid: user.uid,
      nome: user.displayName || 'Profissional',
      data: serverTimestamp(),
    };

    await setDoc(vagaRef, candidato);
    await setDoc(usuarioRef, {
      vagaId: vaga.id,
      titulo: vaga.titulo,
      data: serverTimestamp(),
    });
    setJaCandidatou(true);
  };

  return (
    <Box>
      {/* Banner topo */}
      <Box
        sx={{
          backgroundColor: '#2563eb',
          color: '#fff',
          py: 6,
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight={700}>
            {vaga.titulo}
          </Typography>
          <Typography variant="h6" mt={1}>
            Conecte-se a uma nova oportunidade
          </Typography>
        </Container>
      </Box>

      {/* Breadcrumbs */}
      <Container sx={{ mt: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink underline="hover" color="inherit" href="/">
            Início
          </MuiLink>
          <MuiLink underline="hover" color="inherit" href="/vagas">
            Vagas
          </MuiLink>
          <Typography color="text.primary">{vaga.titulo}</Typography>
        </Breadcrumbs>
      </Container>

      {/* Conteúdo */}
      <Container sx={{ my: 4 }}>
        <Grid container spacing={4}>
          {/* Lado esquerdo: descrição */}
          <Grid size ={{xs:12, md:8}}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Descrição da Vaga
              </Typography>
              <Typography variant="body1" gutterBottom>{vaga.descricao}</Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" gutterBottom>
                <strong>Requisitos:</strong> {vaga.requisitos}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Benefícios:</strong> {vaga.beneficios}
              </Typography>

              <Grid container spacing={2} mt={2}>
                <Grid size={{xs:12,sm:6}}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <AttachMoneyIcon />
                    <Typography>Salário: {vaga.salario}</Typography>
                  </Box>
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon />
                    <Typography>Local: {vaga.local}</Typography>
                  </Box>
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <AccessTimeIcon />
                    <Typography>Jornada: {vaga.jornada}</Typography>
                  </Box>
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <WorkIcon />
                    <Typography>Modalidade: {vaga.modalidade}</Typography>
                  </Box>
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <WhatsAppIcon sx={{ color: '#25D366' }} />
                    <Typography>{vaga.whatsapp}</Typography>
                  </Box>
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TodayIcon />
                    <Typography>
                      Publicado em: {new Date(vaga.dataPublicacao).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {isProfissional && (
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 4 }}
                  onClick={handleCandidatar}
                  disabled={jaCandidatou}
                >
                  {jaCandidatou ? 'Você já se candidatou' : 'Candidatar-se'}
                </Button>
              )}
            </Paper>
          </Grid>

          {/* Lado direito: informações extras */}
          <Grid size={{xs:12, md:4}} >
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <BusinessIcon />
                <Typography variant="h6" fontWeight={600}>
                  
                   {vaga.criadoPor?.nome}
                  
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                onClick={() => router.push(`/perfil/${vaga.criadoPor?.uid}`)}
              >
                Ver perfil da empresa
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
