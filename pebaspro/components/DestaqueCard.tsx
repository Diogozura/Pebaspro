import { Card, Typography, Box } from '@mui/material';

interface DestaqueCardProps {
  icon: React.ReactNode;
  titulo: string;
  descricao: string;
  iconBgColor: string;
}

export default function DestaqueCard({ icon, titulo, descricao, iconBgColor }: DestaqueCardProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        gap: 1,
        borderRadius: 3,
        boxShadow: 3,
        transition: '0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{
          bgcolor: iconBgColor,
          width: 40,
          height: 40,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 20,
        }}
      >
        {icon}
      </Box>
      <Typography fontWeight={600}>{titulo}</Typography>
      <Typography variant="body2" color="text.secondary">{descricao}</Typography>
    </Card>
  );
}
