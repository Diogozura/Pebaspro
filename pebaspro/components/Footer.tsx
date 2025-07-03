'use client';

import {
  Box,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#0c1425', color: 'white', py: 6, mt: 10 }}>
      <Container>
        <Grid container spacing={4} mb={2}>
          {/* Logo e descrição */}
          
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="h6" fontWeight={700} color="#42a5f5">
                PebasPro
              </Typography>
              <Typography variant="body2" color="grey.300" mt={1}>
                Conectando você com os melhores profissionais de Parauapebas.
                Qualidade, segurança e confiança em cada serviço.
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                <StarIcon fontSize="small" sx={{ color: '#fbc02d' }} />
                <Typography variant="body2" fontWeight={600}>4.8/5</Typography>
                <Typography variant="body2" color="grey.400">• 500+ avaliações</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                <VerifiedUserIcon fontSize="small" sx={{ color: 'lightgreen' }} />
                <Typography variant="body2" color="lightgreen">Profissionais Verificados</Typography>
              </Stack>
            </Grid>
       

          {/* Links Rápidos */}
       
            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>Links Rápidos</Typography>
              {['Encontrar Prestadores', 'Buscar Trabalhos', 'Cadastre-se', 'FAQ', 'Como Funciona', 'Termos de Uso'].map((text) => (
                <Link key={text} href="#" underline="hover" color="grey.300" display="block" mb={0.5}>
                  {text}
                </Link>
              ))}
            </Grid>
         

          {/* Categorias */}
         
            <Grid size={{ xs: 6, sm: 6, md: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>Categorias</Typography>
              {['Eletricista', 'Encanador', 'Pedreiro', 'Pintor', 'Diarista', 'Mecânico'].map((cat) => (
                <Link key={cat} href="/profissionais" underline="hover" color="grey.300" display="block" mb={0.5}>
                  {cat}
                </Link>
              ))}
            </Grid>
         

          {/* Contato */}
         
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>Contato</Typography>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2" color="grey.300">Parauapebas, Pará</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2" color="grey.300">(94) 992642914</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2" color="grey.300">contato.pebaspro@gmail.com</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <AccessTimeIcon fontSize="small" />
                <Typography variant="body2" color="grey.300">24h • 7 dias da semana</Typography>
              </Stack>

              <Typography variant="subtitle2" fontWeight={600}>Siga-nos</Typography>
              <Stack direction="row" spacing={1} mt={1}>
                <Link href="https://www.facebook.com/share/15Xm2MiYW7/" underline="none"><IconButton sx={{ bgcolor: '#1877f2' }}><FacebookIcon sx={{ color: '#fff' }} /></IconButton></Link>
                <Link href="https://www.instagram.com/pebas_prooficial" underline="none"><IconButton sx={{ bgcolor: '#e1306c' }}><InstagramIcon sx={{ color: '#fff' }} /></IconButton></Link>
                <Link href="#" underline="none"><IconButton sx={{ bgcolor: '#1da1f2' }}><TwitterIcon sx={{ color: '#fff' }} /></IconButton></Link>
                
               
                
              </Stack>
            </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
}
