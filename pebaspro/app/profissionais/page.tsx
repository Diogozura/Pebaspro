'use client';

import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import CardProfissional from '@/components/CardProfissional';
import FiltroBusca from '@/components/FiltroBusca';

export default function ProfissionaisPage() {
  const [filtros, setFiltros] = useState({ servico: '', regiao: '' });
  const [profissionais, setProfissionais] = useState<any[]>([]);

  useEffect(() => {
    async function buscarProfissionais() {
      const q = query(
        collection(db, 'usuarios'),
        where('tipoConta', '==', 'profissional')
      );
      const snapshot = await getDocs(q);
      const dados = snapshot.docs.map(doc => doc.data());
      setProfissionais(dados);
    }

    buscarProfissionais();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <FiltroBusca onBuscar={setFiltros} />
      {profissionais.map((prof, index) => (
        <CardProfissional
          key={index}
          uid={prof.uid}
          nome={prof.nome || prof.displayName}
          servico={prof.atuacao || 'Serviço não informado'}
          regiao={prof.cidade || 'Região não informada'}
          preco={prof.preco || 'A combinar'}
          avatarUrl={prof.photoURL || '/default-avatar.png'}
        />
      ))}
    </Container>
  );
}
