'use client';

import { Box, Typography, Card } from '@mui/material';
import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  color?: string;
}

export default function StatCard({ icon, value, label, color = '#000' }: StatCardProps) {
  return (
    <Card
      sx={{
        p: 3,
        textAlign: 'center',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        boxShadow: 1,
        cursor: 'default',
        '&:hover': {
          boxShadow: 4,
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box
        sx={{
          fontSize: 32,
          mb: 1,
          color,
          display: 'flex',
          justifyContent: 'center',
          transition: 'transform 0.3s ease',
          '& svg': {
            fontSize: 40,
            transition: 'transform 0.3s ease',
          },
          '&:hover svg': {
            transform: 'scale(1.2)',
          },
        }}
      >
        {icon}
      </Box>

      <Typography variant="h6" fontWeight="bold">
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Card>
  );
}
