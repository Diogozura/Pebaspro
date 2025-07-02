'use client';

import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import Grid from '@mui/material/Grid';
import React from 'react';


interface Vaga {
  titulo: string;
  tipo: 'efetivo' | 'temporario';
  descricao: string;
  requisitos: string;
  beneficios: string;
  local: string;
  modalidade: string;
  jornada: string;
  salario: string;
  whatsapp: string;
  encerramento: string; // ← nova
  dataPublicacao?: string;
}

interface Props {
  modo: 'criar' | 'visualizar';
  vaga?: Vaga;
}

export default function VagaForm({ modo, vaga }: Props) {
  const [dados, setDados] = React.useState<Vaga>(
    vaga || {
      titulo: '',
      tipo: 'efetivo',
      descricao: '',
      requisitos: '',
      beneficios: '',
      local: '',
      modalidade: '',
      jornada: '',
      salario: '',
      whatsapp: '',
      encerramento: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (modo === 'criar') {
      // salvar vaga no banco
      console.log('Criando vaga:', dados);
    } else {
      // botão candidatar-se
      window.open(`https://wa.me/${dados.whatsapp.replace(/\D/g, '')}`, '_blank');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" mb={2}>
        {modo === 'criar' ? 'Criar Vaga' : dados.titulo}
      </Typography>

      <Grid container spacing={2}>
        <Grid >
          <TextField fullWidth label="Título da vaga" name="titulo" value={dados.titulo} onChange={handleChange} disabled={modo === 'visualizar'} />
        </Grid>

        <Grid  >
          <TextField
            select fullWidth label="Tipo"
            name="tipo" value={dados.tipo} onChange={handleChange}
            disabled={modo === 'visualizar'}
          >
            <MenuItem value="efetivo">Efetivo</MenuItem>
            <MenuItem value="temporario">Temporário</MenuItem>
          </TextField>
        </Grid>

        <Grid>
          <TextField
            select fullWidth label="Modalidade"
            name="modalidade" value={dados.modalidade} onChange={handleChange}
            disabled={modo === 'visualizar'}
          >
            <MenuItem value="presencial">Presencial</MenuItem>
            <MenuItem value="remoto">Remoto</MenuItem>
            <MenuItem value="hibrido">Híbrido</MenuItem>
          </TextField>
        </Grid>

        <Grid >
          <TextField fullWidth label="Jornada" name="jornada" value={dados.jornada} onChange={handleChange} disabled={modo === 'visualizar'} />
        </Grid>

        <Grid >
          <TextField fullWidth label="Faixa salarial" name="salario" value={dados.salario} onChange={handleChange} disabled={modo === 'visualizar'} />
        </Grid>

        <Grid >
          <TextField fullWidth label="Local (Cidade/Bairro)" name="local" value={dados.local} onChange={handleChange} disabled={modo === 'visualizar'} />
        </Grid>

        <Grid >
          <TextField
            fullWidth multiline minRows={3}
            label="Descrição da vaga" name="descricao"
            value={dados.descricao} onChange={handleChange}
            disabled={modo === 'visualizar'}
          />
        </Grid>

        <Grid >
          <TextField
            fullWidth multiline minRows={2}
            label="Requisitos" name="requisitos"
            value={dados.requisitos} onChange={handleChange}
            disabled={modo === 'visualizar'}
          />
        </Grid>

        <Grid >
          <TextField
            fullWidth multiline minRows={2}
            label="Benefícios" name="beneficios"
            value={dados.beneficios} onChange={handleChange}
            disabled={modo === 'visualizar'}
          />
        </Grid>

        <Grid >
          <TextField fullWidth label="WhatsApp para contato" name="whatsapp" value={dados.whatsapp} onChange={handleChange} disabled={modo === 'visualizar'} />
        </Grid>

        {modo === 'visualizar' && dados.dataPublicacao && (
          <Grid >
            <Typography variant="body2" color="text.secondary">
              Publicado em: {dados.dataPublicacao}
            </Typography>
          </Grid>
        )}
        <Grid >
          <TextField
            fullWidth
            label="Encerramento da vaga"
            name="encerramento"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dados.encerramento}
            onChange={handleChange}
            disabled={modo === 'visualizar'}
          />
        </Grid>
        <Grid >
          <Button fullWidth variant="contained" color={modo === 'criar' ? 'primary' : 'success'} onClick={handleSubmit}>
            {modo === 'criar' ? 'Criar vaga' : 'Candidatar-se'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
