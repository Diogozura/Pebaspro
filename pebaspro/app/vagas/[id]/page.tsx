'use client';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import VagaDetalhes from '@/components/VagaDetalhes';
import React from 'react';
import { useParams } from 'next/navigation';


export default function VagaPage() {
  const { id } = useParams();
  const [vaga, setVaga] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchVaga = async () => {
      if (!id) return;
      const ref = doc(db, 'vagas', id.toString());
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setVaga({ id: snap.id, ...snap.data() });
      }
    };
    fetchVaga();
  }, [id]);

  if (!vaga) return <p>Carregando vaga...</p>;

  return <VagaDetalhes vaga={vaga} />;
}
