'use client';

import { Box, Button, Card, Typography, Avatar, Stack } from '@mui/material';
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
    <Link href={`/vagas/${id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          p: 2,
          backgroundColor: '#f0f9ff',
          borderRadius: 3,
          boxShadow: 2,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: 4,
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight={700} color="primary">
            {vaga}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {dataFormatada}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {detalhe}
        </Typography>

        <Stack direction="row" spacing={2} mt={1}>
          <Box>
            <Typography variant="body2">
              <strong>Região:</strong> {regiao}
            </Typography>
            <Typography variant="body2">
              <strong>Valor:</strong> {valor}
            </Typography>
          </Box>
        </Stack>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {empresa}
          </Typography>
          {logoUrl && (
            <Avatar src={logoUrl} alt="logo empresa" sx={{ width: 40, height: 40 }} />
          )}
        </Box>
      </Card>
    </Link>
  );
}
