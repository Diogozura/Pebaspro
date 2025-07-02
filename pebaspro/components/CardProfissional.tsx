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
    <Link href={`/perfil/${uid}`}>

    
    <Card sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#eff6ff', mb: 2 }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={avatarUrl} />
        <Box>
          <Typography fontWeight={600}>{nome}</Typography>
          <Typography variant="body2">{servico}</Typography>
          <Typography variant="body2">{regiao}</Typography>
        </Box>
      </Box>
      <Box textAlign="right">
        <Typography fontWeight={600}>{preco}</Typography>
        <Button variant="contained" sx={{ mt: 1, backgroundColor: '#25D366' }}>
          WhatsApp
        </Button>
      </Box>
    </Card>
    </Link>
  );
}
