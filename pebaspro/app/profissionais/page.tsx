'use client';

import CardProfissional from '@/components/CardProfissional';
import FiltroBusca from '@/components/FiltroBusca';
import { Container } from '@mui/material';
import { useState } from 'react';


export default function ProfissionaisPage() {
  const [filtros, setFiltros] = useState({ servico: '', regiao: '' });

  const profissionais = [
    {
      nome: 'Pedro',
      servico: 'Eletricista',
      regiao: 'Parauapebas',
      preco: 'R$ 150 /h',
      avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    // ...outros
  ];

  return (
    <Container sx={{ py: 4 }}>
      <FiltroBusca onBuscar={setFiltros} />
      {profissionais.map((prof, index) => (
        <CardProfissional key={index} {...prof} />
      ))}
    </Container>
  );
}
