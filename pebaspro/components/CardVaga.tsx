import { Box, Button, Card, Typography } from '@mui/material';
import Link from 'next/link';

export default function CardVaga({
  vaga,
  detalhe,
  regiao,
  valor,
  logoUrl,
}: {
  vaga: string;
  detalhe: string;
  regiao: string;
  valor: string;
  logoUrl?: string;
}) {
  return (
    <Link href={'/vagas/1'}>
  
    <Card sx={{ p: 2, backgroundColor: '#eff6ff', mb: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography>Vaga: {vaga}</Typography>
        <Typography variant="caption">tempo do post</Typography>
      </Box>
      <Typography>Detalhe: {detalhe}</Typography>
      <Typography>Região: {regiao}</Typography>
      <Typography>Valor pago: {valor}</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        {logoUrl && <img src={logoUrl} alt="logo" height={32} />}
        <Button variant="contained" sx={{ backgroundColor: '#25D366' }}>
          WhatsApp
        </Button>
      </Box>
    </Card>
      </Link>
  );
}
