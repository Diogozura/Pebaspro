'use client';

import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import FiltroBusca from '@/components/FiltroBusca';
import CardVaga from '@/components/CardVaga';

export default function VagasPage() {
  const [filtros, setFiltros] = useState({ servico: '', regiao: '' });
  const [vagas, setVagas] = useState<any[]>([]);

  useEffect(() => {
    const buscarVagas = async () => {
      try {
        const ref = collection(db, 'vagas');
        const q = query(ref, orderBy('dataPublicacao', 'desc'));
        const snap = await getDocs(q);
        const lista = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVagas(lista);
      } catch (error) {
        console.error('Erro ao buscar vagas:', error);
      }
    };

    buscarVagas();
  }, []);

  const vagasFiltradas = vagas.filter(
    (vaga) =>
      (filtros.servico === '' || vaga.titulo.toLowerCase().includes(filtros.servico.toLowerCase())) &&
      (filtros.regiao === '' || vaga.local.toLowerCase().includes(filtros.regiao.toLowerCase()))
  );

  return (
    <Container sx={{ py: 4 }}>
      <FiltroBusca onBuscar={setFiltros} />

      {vagasFiltradas.length === 0 && (
        <Typography variant="body2" color="text.secondary" mt={2}>
          Nenhuma vaga encontrada com os filtros selecionados.
        </Typography>
      )}

      {vagasFiltradas.map((vaga) => (
        <CardVaga
          key={vaga.id}
          id={vaga.id}
          vaga={vaga.titulo}
          detalhe={vaga.descricao}
          regiao={vaga.local}
          valor={vaga.salario}
          logoUrl={vaga.logoUrl}
          empresa={vaga.criadoPor?.nome || 'Empresa não identificada'}
          data={vaga.dataPublicacao}
        />
      ))}
    </Container>
  );
}
