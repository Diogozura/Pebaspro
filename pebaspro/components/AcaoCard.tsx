import { Card, Typography, Box } from '@mui/material';

interface AcaoCardProps {
  icon: React.ReactNode;
  titulo: string;
  descricao: string;
  bgColor: string;
  onClick?: () => void;
}

export default function AcaoCard({ icon, titulo, descricao, bgColor, onClick }: AcaoCardProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        bgcolor: bgColor,
        color: '#fff',
        p: 3,
        maxWidth: 436,
        maxHeight: 228,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        boxShadow: 4,
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 8,
        },
      }}
    >
      <Box fontSize={36} mb={1}>
        {icon}
      </Box>
      <Typography fontWeight={700} fontSize={16}>{titulo}</Typography>
      <Typography fontSize={13}>{descricao}</Typography>
      <Typography fontSize={22} mt={1}>→</Typography>
    </Card>
  );
}
