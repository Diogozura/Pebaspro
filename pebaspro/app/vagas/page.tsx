'use client';

import { Container } from '@mui/material';
import { useState } from 'react';
import FiltroBusca from '@/components/FiltroBusca';
import CardVaga from '@/components/CardVaga';

export default function VagasPage() {
  const [filtros, setFiltros] = useState({ servico: '', regiao: '' });

  const vagas = [
    {
      vaga: 'Eletricista',
      detalhe: 'Instalação de rede residencial',
      regiao: 'Parauapebas',
      valor: 'R$2.500,00/Mês',
      logoUrl: '/logo_empresa.png',
    },
    // ...outras vagas
  ];

  const vagasFiltradas = vagas.filter(
    (vaga) =>
      (filtros.servico === '' || vaga.vaga.toLowerCase().includes(filtros.servico.toLowerCase())) &&
      (filtros.regiao === '' || vaga.regiao.toLowerCase().includes(filtros.regiao.toLowerCase()))
  );

  return (
    <Container sx={{ py: 4 }}>
      <FiltroBusca onBuscar={setFiltros} />
      {vagasFiltradas.map((vaga, index) => (
        <CardVaga key={index} {...vaga} />
      ))}
    </Container>
  );
}
