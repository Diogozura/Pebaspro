import { Box, Button, Card, Typography } from '@mui/material';
import Link from 'next/link';

export default function CardVaga({
  id,
  vaga,
  detalhe,
  regiao,
  valor,
  logoUrl,
  empresa,
  data,
}: {
   id: string;
  vaga: string;
  detalhe: string;
  regiao: string;
  valor: string;
  logoUrl?: string;
  empresa?: string;
  data?: string;
}) {
  const dataFormatada = data ? new Date(data).toLocaleDateString('pt-BR') : '';

  return (
    <Link href={`/vagas/${id}`}>
      <Card sx={{ p: 2, backgroundColor: '#eff6ff', mb: 2 }}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography fontWeight={600}>{vaga}</Typography>
          <Typography variant="caption">{dataFormatada}</Typography>
        </Box>

        <Typography>Detalhe: {detalhe}</Typography>
        <Typography>Região: {regiao}</Typography>
        <Typography>Valor pago: {valor}</Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="body2" fontWeight={500}>{empresa}</Typography>
          {logoUrl && <img src={logoUrl} alt="logo" height={32} />}
        </Box>
      </Card>
    </Link>
  );
}
