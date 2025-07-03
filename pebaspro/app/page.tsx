import StatCard from "@/components/StatCard";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StarRateIcon from '@mui/icons-material/StarRate';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import BoltIcon from '@mui/icons-material/Bolt';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import ShieldIcon from '@mui/icons-material/Shield';
import GradeIcon from '@mui/icons-material/Grade';
import ConstructionIcon from '@mui/icons-material/Construction';
import PaletteIcon from '@mui/icons-material/Palette';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import TireRepairIcon from '@mui/icons-material/TireRepair';

import CategoriaCard from "@/components/CategoriaCard";
import DestaqueCard from "@/components/DestaqueCard";
import AcaoCard from "@/components/AcaoCard";
import BannerHero from "@/components/BannerHero";

export default function Home() {
  return (
    <>
      <BannerHero />
      <Divider sx={{ my: 4 }} />
      <Container sx={{ mb: 4 }}>


        <Grid container spacing={3}>
          <Grid size={{ xs: 6, sm: 3 }} >
            <StatCard icon={<PeopleAltIcon />} value="500+" label="Profissionais" color="#2962ff" />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <StatCard icon={<StarRateIcon />} value="4.8" label="Avaliação" color="#fbc02d" />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }} >
            <StatCard icon={<LocationOnIcon />} value="15" label="Bairros" color="#2e7d32" />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }} >
            <StatCard icon={<AccessTimeIcon />} value="24h" label="Disponível" color="#7e57c2" />
          </Grid>
        </Grid>
        <Typography variant="h4" component={'h2'} textAlign={'center'} sx={{ mt: 4, mb: 2 }}>
          O que você precisa?
        </Typography>

        <Grid container spacing={2} justifyContent={'center'}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <AcaoCard
              icon={<SearchIcon fontSize="large" />}
              titulo="Encontrar Prestador"
              descricao="Busque profissionais qualificados"
              bgColor="#2563eb"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <AcaoCard
              icon={<WorkIcon fontSize="large" />}
              titulo="Buscar Trabalho"
              descricao="Encontre oportunidades de trabalho"
              bgColor="#15803d"
            />
          </Grid>
        </Grid>

        <Typography variant="h4" component={'h2'} textAlign={'center'} sx={{ mt: 4, mb: 2 }}>Categorias Populares</Typography>
        <Grid container spacing={2} >
          <Grid size={{ xs: 4, sm: 2 }}>
            <CategoriaCard icon={<BoltIcon />} label="Eletricista" bgColor="#fff9c4" />
          </Grid>
          <Grid size={{ xs: 4, sm: 2 }}>
            <CategoriaCard icon={<PlumbingIcon />} label="Encanador" bgColor="#e3f2fd" />
          </Grid>
          <Grid size={{ xs: 4, sm: 2 }}>
            <CategoriaCard icon={<ConstructionIcon />} label="Pedreiro" bgColor="#e3f2fd" />
          </Grid>
          <Grid size={{ xs: 4, sm: 2 }}>
            <CategoriaCard icon={<PaletteIcon />} label="Pintor" bgColor="#e3f2fd" />
          </Grid>
          <Grid size={{ xs: 4, sm: 2 }}>
            <CategoriaCard icon={<CleaningServicesIcon />} label="Diarista" bgColor="#e3f2fd" />
          </Grid>
          <Grid size={{ xs: 4, sm: 2 }}>
            <CategoriaCard icon={<TireRepairIcon />} label="Mecânico" bgColor="#e3f2fd" />
          </Grid>
        </Grid>

        <Typography variant="h4" component={'h2'} textAlign={'center'} sx={{ mt: 4, mb: 2 }}>Por que escolher nossa plataforma?</Typography>
        <Grid container spacing={2} justifyContent={'center'}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <DestaqueCard
              icon={<BoltIcon />}
              titulo="Conexão Rápida"
              descricao="Encontre profissionais em minutos"
              iconBgColor="#4caf50"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <DestaqueCard
              icon={<ShieldIcon />}
              titulo="Segurança Garantida"
              descricao="Profissionais verificados e avaliados"
              iconBgColor="#2196f3"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <DestaqueCard
              icon={<GradeIcon />}
              titulo="Avaliações Reais"
              descricao="Sistema de feedback confiável"
              iconBgColor="#fbc02d"
            />
          </Grid>
        </Grid>












      </Container>
    </>
  );
}
