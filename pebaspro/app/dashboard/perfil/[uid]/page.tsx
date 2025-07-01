import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import PerfilActions from './PerfilActions';


export async function generateMetadata({ params }: any) {
  const snap = await getDoc(doc(db, 'usuarios', params.uid));
  if (!snap.exists()) {
    return { title: 'Perfil Público' };
  }
  const data = snap.data();
  return { title: `Perfil de ${data.nome} - Pebaspro` };
}

export default async function PerfilPublico({ params }: { params: { uid: string } }) {
  const snap = await getDoc(doc(db, 'usuarios', params.uid));
  if (!snap.exists()) return notFound();

  const data = snap.data();

  return (
    <main style={{ padding: 32 }}>
      <h1>{data.nome}</h1>
      <p><strong>Área:</strong> {data.area}</p>
      <p><strong>Região:</strong> {data.regiao}</p>
      <p><strong>Telefone:</strong> {data.telefone}</p>

      <PerfilActions uid={params.uid} nome={data.nome} />
    </main>
  );
}
