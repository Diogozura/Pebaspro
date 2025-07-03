'use client';

import { Avatar, Box, Button, Card, Typography } from '@mui/material';
import Link from 'next/link';

export default function CardProfissional({
  nome,
  servico,
  regiao,
  preco,
  avatarUrl,
  uid,
}: {
  nome: string;
  servico: string;
  regiao: string;
  preco: string;
  avatarUrl: string;
  uid: string;
}) {
  return (
    <Link href={`/perfil/${uid}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          p: 2,
          mb: 2,
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
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={avatarUrl} sx={{ width: 56, height: 56 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight={700} color="primary">
                {nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {servico}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {regiao}
              </Typography>
            </Box>
          </Box>

          <Box textAlign="right">
            <Typography fontWeight={600} color="success.main">
              {preco}
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{
                mt: 1,
                backgroundColor: '#25D366',
                '&:hover': { backgroundColor: '#1ebe5d' },
              }}
            >
              WhatsApp
            </Button>
          </Box>
        </Box>
      </Card>
    </Link>
  );
}
