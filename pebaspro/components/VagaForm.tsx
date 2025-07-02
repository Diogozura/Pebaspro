'use client';

import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useParams } from 'next/navigation';

interface Vaga {
  id?: string;
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
  encerramento: string;
  dataPublicacao?: string;
}

interface Props {
  modo: 'criar' | 'visualizar';
  vaga?: Vaga;
}

export default function VagaForm({ modo, vaga }: Props) {
  const { user } = useAuth();
  const isProfissional = user?.tipoConta === 'profissional';


  const [dados, setDados] = useState<Vaga>(
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

 const handleSubmit = async () => {
  if (!user) {
    alert('Você precisa estar logado para criar uma vaga.');
    return;
  }

  try {
    const vagaRef = doc(collection(db, 'vagas')); // cria referência com id gerado
    const novaVaga = {
      ...dados,
      id: vagaRef.id, // <-- adiciona o id manualmente aos dados
      criadoPor: {
        uid: user.uid,
        nome: user.displayName || 'Usuário',
      },
      dataPublicacao: serverTimestamp(),
    };

    await setDoc(vagaRef, novaVaga); // salva com id incluído

    alert('Vaga criada com sucesso!');
    setDados({
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
    });
  } catch (error) {
    console.error('Erro ao salvar vaga:', error);
    alert('Erro ao salvar vaga. Tente novamente.');
  }
};



  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {modo === 'criar' ? 'Criar Vaga' : dados.titulo}
      </Typography>

      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField fullWidth label="Título da vaga" name="titulo" value={dados.titulo} onChange={handleChange} disabled={modo === 'visualizar'} />
        </Grid>

        <Grid size={6}>
          <TextField select fullWidth label="Tipo" name="tipo" value={dados.tipo} onChange={handleChange} disabled={modo === 'visualizar'}>
            <MenuItem value="efetivo">Efetivo</MenuItem>
            <MenuItem value="temporario">Temporário</MenuItem>
          </TextField>
        </Grid>

        <Grid size={6}>
          <TextField select fullWidth label="Modalidade" name="modalidade" value={dados.modalidade} onChange={handleChange} disabled={modo === 'visualizar'}>
            <MenuItem value="presencial">Presencial</MenuItem>
            <MenuItem value="remoto">Remoto</MenuItem>
            <MenuItem value="hibrido">Híbrido</MenuItem>
          </TextField>
        </Grid>

        <Grid size={6}>
          <TextField fullWidth label="Jornada" name="jornada" value={dados.jornada} onChange={handleChange} disabled={modo === 'visualizar'} />
        </Grid>

        <Grid size={6}>
          <TextField fullWidth label="Faixa salarial" name="salario" value={dados.salario} onChange={handleChange} disabled={modo === 'visualizar'} />
        </Grid>

        <Grid size={12}>
          <TextField fullWidth label="Local (Cidade/Bairro)" name="local" value={dados.local} onChange={handleChange} disabled={modo === 'visualizar'} />
        </Grid>

        <Grid size={12}>
          <TextField fullWidth multiline minRows={3} label="Descrição da vaga" name="descricao" value={dados.descricao} onChange={handleChange} disabled={modo === 'visualizar'} />
        </Grid>

        <Grid size={12}>
          <TextField fullWidth multiline minRows={2} label="Requisitos" name="requisitos" value={dados.requisitos} onChange={handleChange} disabled={modo === 'visualizar'} />
        </Grid>

        <Grid size={12}>
          <TextField fullWidth multiline minRows={2} label="Benefícios" name="beneficios" value={dados.beneficios} onChange={handleChange} disabled={modo === 'visualizar'} />
        </Grid>

        <Grid size={12}>
          <TextField fullWidth label="WhatsApp para contato" name="whatsapp" value={dados.whatsapp} onChange={handleChange} disabled={modo === 'visualizar'} />
        </Grid>

        <Grid size={12}>
          <TextField fullWidth label="Encerramento da vaga" name="encerramento" type="date" InputLabelProps={{ shrink: true }} value={dados.encerramento} onChange={handleChange} disabled={modo === 'visualizar'} />
        </Grid>

        {modo === 'visualizar' && dados.dataPublicacao && (
          <Grid size={12}>
            <Typography variant="body2" color="text.secondary">
              Publicado em: {new Date(dados.dataPublicacao).toLocaleDateString()}
            </Typography>
          </Grid>
        )}

        <Grid size={12}>
          {modo === 'criar' && (
            <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
              Criar vaga
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
