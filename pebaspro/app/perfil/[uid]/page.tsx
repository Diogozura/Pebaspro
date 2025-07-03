import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import PerfilActions from './PerfilActions';
import type { Metadata } from 'next';
import { Avatar, Box, Breadcrumbs, Card, CardContent, Container, Divider, Grid, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import Link from 'next/link';


export async function generateMetadata({ params }: any): Promise<Metadata> {
  const snap = await getDoc(doc(db, 'usuarios', params.uid));
  if (!snap.exists()) {
    return { title: 'Perfil Público' };
  }
  const data = snap.data();
  return { title: `Perfil de ${data.nome} - Pebaspro` };
}

export default async function PerfilPublico(props: any) {
  const uid = props?.params?.uid;
  if (!uid) return notFound();

  const snap = await getDoc(doc(db, 'usuarios', uid));
  if (!snap.exists()) return notFound();

  const data = snap.data();
  console.log('Dados do perfil:', data);
  return (
    <Box>

      <Container sx={{ mt: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">
            Início
          </Link>
          <Link href="/vagas">
            Serviços
          </Link>
          <Typography color="text.primary">{data.nome}</Typography>
        </Breadcrumbs>
      </Container>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 6 }}>
        {/* Breadcrumbs */}

        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Box textAlign="center" mb={3}>
              <Avatar
                src={data.photoURL || '/default-avatar.png'}
                sx={{ width: 80, height: 80, margin: '0 auto', mb: 1 }}
              />
              <Typography variant="h5" fontWeight={600}>
                {data.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Profissional cadastrado no PebasPro
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              <Grid size={12}>
                <Box display="flex" alignItems="center" gap={1}>
                  <WorkIcon color="primary" />
                  <Typography variant="body1">
                    <strong>Área:</strong> {data.atuacao || 'Não informada'}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={12}>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon color="primary" />
                  <Typography variant="body1">
                    <strong>Região:</strong> {data.cidade || 'Não informada'}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={12}>
                <Box display="flex" alignItems="center" gap={1}>
                  <PhoneIcon color="primary" />
                  <Typography variant="body1">
                    <strong>Telefone:</strong> {data.telefone || 'Não informado'}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={12}>
                <Box display="flex" alignItems="center" gap={1}>
                  <PhoneIcon color="primary" />
                  <Typography variant="body1">
                    <strong>Preço por hora:</strong> R$ {data.preco || 'Não informado'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Box mt={4}>
              <PerfilActions uid={uid} nome={data.nome} />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>

  );
}
