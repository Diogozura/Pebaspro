import { Box, Card, Typography } from '@mui/material';

interface CategoriaCardProps {
  icon: React.ReactNode;
  label: string;
  bgColor: string;
}

export default function CategoriaCard({ icon, label, bgColor }: CategoriaCardProps) {
  return (
    <Card
      sx={{
        width: 100,
        height: 100,
        bgcolor: bgColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 3,
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}
    >
      <Box fontSize={24}>{icon}</Box>
      <Typography variant="body2">{label}</Typography>
    </Card>
  );
}
