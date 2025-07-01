'use client';

type Props = {
  uid: string;
  nome: string;
};

export default function PerfilActions({ uid, nome }: Props) {
  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/perfil/${uid}`
    : '';

  const compartilhar = () => {
    if (navigator.share) {
      navigator.share({
        title: `Perfil de ${nome}`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copiado!');
    }
  };

  return (
    <button onClick={compartilhar}>
      Compartilhar Perfil
    </button>
  );
}
