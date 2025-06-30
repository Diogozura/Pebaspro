'use client';

import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '@/hooks/useAuth';
import LogoutButton from '@/components/LogoutButton';

export default function Dashboard() {
  const tipoConta: 'empresa' | 'funcionario' = 'empresa'; // troca para testar
  const { user, loading } = useAuth(true); // 🔒 redireciona se não tiver login

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        {/* Card principal */}
        <Card
          sx={{
            boxShadow: 2,
            border: '1px solid #90caf9',
            borderRadius: 2,
            p: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4">Bem-vindo(a), {user?.displayName || 'Usuário'}!</Typography>
          <Avatar
            src={
              tipoConta === 'empresa'
                ? '/logo_empresa.png'
                : 'https://randomuser.me/api/portraits/men/75.jpg'
            }
            sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
          />
          <Typography variant="h6">
            {tipoConta === 'empresa' ? 'Electrical' : 'Pedro'}
          </Typography>
          <Typography variant="body2">
            {tipoConta === 'empresa' ? 'Elétrica residencial' : 'Eletricista'}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Parauapebas
          </Typography>
          <IconButton size="small">
            <EditIcon fontSize="small" />
          </IconButton>
          <LogoutButton/>
        </Card>

        {/* Contato */}
        <Card
          sx={{
            boxShadow: 1,
            border: '1px solid #bbdefb',
            borderRadius: 2,
            p: 2,
            backgroundColor: '#f5faff',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" fontWeight={600}>
              {tipoConta === 'empresa' ? 'Informações pessoais' : 'Contato'}
            </Typography>
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="body2">Telefone: (99) 99999-9999</Typography>
          <Typography variant="body2">Email: pedro@email.com</Typography>
        </Card>

        {/* Sobre mim */}
        <Card
          sx={{
            boxShadow: 1,
            border: '1px solid #bbdefb',
            borderRadius: 2,
            p: 2,
            backgroundColor: '#f5faff',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" fontWeight={600}>
              Sobre mim
            </Typography>
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body2">
            {tipoConta === 'empresa'
              ? 'Somos uma empresa de elétrica residencial na cidade ...'
              : 'Sou eletricista formado no SENAI e atuei em diversas obras da região ...'}
          </Typography>
        </Card>

        {/* Se for EMPRESA, mostrar vagas */}
        {tipoConta === 'empresa' && (
          <>
            <Typography variant="subtitle1" fontWeight={600}>
              Vagas de empregos criadas
            </Typography>
            <Link href="/vagas/criar" underline="hover">
                 criar vaga
                </Link>
            <Card
              sx={{
                boxShadow: 1,
                border: '1px solid #bbdefb',
                borderRadius: 2,
                p: 2,
                backgroundColor: '#f5faff',
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                Vagas Eletricistas
              </Typography>
              <Typography variant="body2">Criada em: 15/06/2025</Typography>
              <Typography variant="body2">Total de interessados: 15</Typography>
              <Box mt={1}>
                <Link href="#" underline="hover">
                  Baixar todos os currículos
                </Link>
              </Box>
              
            </Card>
          </>
        )}
      </Stack>
      
    </Container>
  );
}
