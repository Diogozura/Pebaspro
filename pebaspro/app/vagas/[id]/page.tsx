import VagaForm from '@/components/VagaForm';

const vagaFake = {
  titulo: 'Eletricista Residencial',
  tipo: 'efetivo' as 'efetivo',
  descricao: 'Precisamos de eletricista com experiência em instalações prediais...',
  requisitos: 'Curso técnico completo, NR10, experiência de 2 anos',
  beneficios: 'Vale-transporte, refeição, plano de saúde',
  local: 'Parauapebas - PA',
  modalidade: 'presencial',
  jornada: 'Integral',
  salario: 'R$ 2.500,00 / mês',
  whatsapp: '(99) 99999-9999',
  dataPublicacao: '27/06/2025',
  encerramento: '' // Adicione um valor apropriado aqui, por exemplo: '30/06/2025'
};

export default function VisualizarVagaPage() {
  return <VagaForm modo="visualizar" vaga={vagaFake} />;
}
