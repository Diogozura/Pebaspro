'use client';

import { Box, Button, Grid, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';

export default function BannerHero() {
  const router = useRouter();

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        color: '#fff',
        textAlign: 'center',
        py: { xs: 6, md: 10 },
        px: 2,
      }}
    >
      <EmojiObjectsIcon sx={{ color: '#FFD700', fontSize: 40 }} />

      <Typography
        variant="h3"
        fontWeight={800}
        sx={{ mt: 2, mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}
      >
        Conecte-se com os melhores <EmojiObjectsIcon sx={{ fontSize: 30, verticalAlign: 'middle', color: '#FFD700' }} />
      </Typography>

      <Typography variant="h6" sx={{ maxWidth: 600, mx: 'auto', opacity: 0.9 }}>
        A plataforma que conecta você aos profissionais mais qualificados de Parauapebas.
        <br />
        <Box component="span" fontWeight="bold" color="#FFD700">
          Rápido, seguro e confiável.
        </Box>
      </Typography>

      {/* Botões */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          flexWrap: 'wrap',
          mt: 4,
        }}
      >
        <Button
          onClick={() => router.push('/profissionais')}
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            borderRadius: '50px',
            textTransform: 'none',
            fontSize: '1rem',
          }}
          endIcon={<ArrowForwardIcon />}
        >
          Encontrar Profissional
        </Button>

        <Button
          onClick={() => router.push('/vagas')}
          variant="outlined"
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            borderRadius: '50px',
            textTransform: 'none',
            fontSize: '1rem',
            color: '#fff',
            borderColor: '#fff',
            '&:hover': {
              borderColor: '#FFD700',
              color: '#FFD700',
            },
          }}
        >
          Buscar Trabalho
        </Button>
      </Box>

      {/* Estatísticas */}
      <Grid container spacing={2} justifyContent="center" mt={6}>
        {[
          { label: 'Profissionais', value: '500+' },
          { label: 'Avaliação', value: '4.8', icon: <StarIcon fontSize="small" sx={{ color: '#FFD700', ml: 0.5 }} /> },
          { label: 'Bairros', value: '15' },
          { label: 'Disponível', value: '24h' },
        ].map((stat, i) => (
          <Grid  size={{xs:6, sm:3}} key={i}>
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                py: 2,
                px: 1,
              }}
            >
              <Typography fontWeight="bold" fontSize="1.5rem" color="#FFD700">
                {stat.value}
                {stat.icon && stat.icon}
              </Typography>
              <Typography variant="body2">{stat.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
