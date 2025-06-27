// /app/profissionais/[id]/page.tsx
'use client';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Divider,
  Container,
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function PerfilProfissional() {
  // Simulação de dados – depois isso virá de uma API ou Firebase
  const dados = {
    nome: 'Pedro',
    profissao: 'Eletricista',
    cidade: 'Parauapebas',
    descricao:
      'Profissional formado no SENAI em 2010. Experiência em manutenção elétrica residencial e predial.',
    telefone: '(99) 99999-9999',
    email: 'pedro@email.com',
    curriculoUrl: 'https://exemplo.com/curriculo.pdf',
    verificado: true,
    foto: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box p={2}>
        <Card elevation={3}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3} textAlign="center">
                <Avatar
                  src={dados.foto}
                  sx={{ width: 100, height: 100, margin: 'auto' }}
                />
                {dados.verificado && (
                  <Chip
                    label="Verificado"
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
              </Grid>

              <Grid item xs={12} sm={9}>
                <Typography variant="h5">{dados.nome}</Typography>
                <Typography color="text.secondary">{dados.profissao}</Typography>
                <Typography color="text.secondary">{dados.cidade}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box mt={2}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="h6">Sobre mim</Typography>
              <Typography>{dados.descricao}</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box mt={2}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="h6">Informações de Contato</Typography>
              <Typography>Telefone: {dados.telefone}</Typography>
              <Typography>Email: {dados.email}</Typography>
              <Button
                variant="contained"
                color="success"
                startIcon={<WhatsAppIcon />}
                sx={{ mt: 2 }}
                href={`https://wa.me/55${dados.telefone.replace(/\D/g, '')}`}
                target="_blank"
              >
                Falar no WhatsApp
              </Button>

              {dados.curriculoUrl && (
                <Box mt={2}>
                  <Button
                    variant="outlined"
                    href={dados.curriculoUrl}
                    target="_blank"
                  >
                    Baixar Currículo
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
