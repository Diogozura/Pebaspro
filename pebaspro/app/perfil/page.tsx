'use client';

import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { db } from '@/lib/firebase';
import { collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';
import LogoutButton from '@/components/LogoutButton';
import React from 'react';
import { useRouter } from 'next/navigation';
import CardProfissional from '@/components/CardProfissional';

export default function Perfil() {
  const { user, loading } = useAuth(true);
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [loading, user, router]);

  const [editandoSobre, setEditandoSobre] = React.useState(false);
  const [novoSobre, setNovoSobre] = React.useState(user?.sobreMim || '');

  const [editandoContato, setEditandoContato] = React.useState(false);
  const [contato, setContato] = React.useState({
    whatsapp: user?.whatsapp || '',
    instagram: user?.instagram || '',
    facebook: user?.facebook || '',
    linkedin: user?.linkedin || '',
  });
  const [editandoPerfil, setEditandoPerfil] = React.useState(false);
  const [novoNome, setNovoNome] = React.useState(user?.displayName || '');
  const [novaAtuacao, setNovaAtuacao] = React.useState(user?.atuacao || '');
  const [novoPreco, setNovoPreco] = React.useState(user?.preco || '');
  const [novaCidade, setNovaCidade] = React.useState(user?.cidade || '');
  const [editandoCertificacoes, setEditandoCertificacoes] = React.useState(false);
  const [certificacoes, setCertificacoes] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (user?.certificacoes) {
      setCertificacoes(user.certificacoes);
    }
  }, [user]);
  const [vagasCriadas, setVagasCriadas] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!user || tipoConta !== 'empresa') return;

    const fetch = async () => {
      const ref = collection(db, 'vagas');
      const q = query(ref);
      const snap = await getDocs(q);
      const minhas = snap.docs
        .filter(d => d.data().criadoPor?.uid === user.uid)
        .map(d => ({ id: d.id, ...d.data() }));
      setVagasCriadas(minhas);
    };
    fetch();
  }, [user]);
  const [candidatosPorVaga, setCandidatosPorVaga] = React.useState<{ [key: string]: any[] }>({});

  React.useEffect(() => {
    const buscarCandidatos = async () => {
      const resultado: { [key: string]: any[] } = {};

      for (const vaga of vagasCriadas) {
        const ref = collection(db, 'vagas', vaga.id, 'candidaturas');
        const q = query(ref, orderBy('data', 'desc'));
        const snap = await getDocs(q);
        resultado[vaga.id] = snap.docs.map(d => ({
          uid: d.id,
          ...d.data(),
        }));
      }

      setCandidatosPorVaga(resultado);
    };

    if (vagasCriadas.length) {
      buscarCandidatos();
    }
  }, [vagasCriadas]);
  const tipoConta = user?.tipoConta as 'empresa' | 'profissional';
  console.log('candidatos', candidatosPorVaga)

  const [candidaturas, setCandidaturas] = React.useState<any[]>([]);
  console.log('candidaturas', candidaturas)

  React.useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const ref = collection(db, 'usuarios', user.uid, 'candidaturas');
      const q = query(ref, orderBy('data', 'desc'));
      const snap = await getDocs(q);
      const lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setCandidaturas(lista);
    };
    fetch();
  }, [user]);

  if (loading) return null;

  if (loading || !user) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }
  const salvarPerfil = async () => {
    await updateDoc(doc(db, 'usuarios', user.uid), {
      displayName: novoNome,
      atuacao: novaAtuacao,
      preco: novoPreco,
      cidade: novaCidade,
    });
    setEditandoPerfil(false);
  };

  const salvarSobre = async () => {
    await updateDoc(doc(db, 'usuarios', user.uid), { sobreMim: novoSobre });
    setEditandoSobre(false);
  };

  const salvarContato = async () => {
    await updateDoc(doc(db, 'usuarios', user.uid), contato);
    setEditandoContato(false);
  };

  const salvarCertificacoes = async () => {
    await updateDoc(doc(db, 'usuarios', user.uid), { certificacoes });
    setEditandoCertificacoes(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>

        {/* Perfil principal */}
        {/* Perfil principal */}
        <Card sx={{ boxShadow: 2, border: '1px solid #90caf9', borderRadius: 2, p: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" fontWeight={600}>Perfil</Typography>
            <IconButton size="small" onClick={() => setEditandoPerfil(!editandoPerfil)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box textAlign="center" mt={2} mb={2}>
            <Avatar src={user.photoURL || '/default-avatar.png'} sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }} />
          </Box>

          {editandoPerfil ? (
            <>
              <TextField
                fullWidth
                label="Nome"
                margin="dense"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
              />
              <TextField
                fullWidth
                label="Área de atuação"
                margin="dense"
                value={novaAtuacao}
                onChange={(e) => setNovaAtuacao(e.target.value)}
              />
              <TextField
                fullWidth
                label="Preço por hora"
                margin="dense"
                value={novoPreco}
                onChange={(e) => setNovoPreco(e.target.value)}
              />
              <TextField
                fullWidth
                label="Cidade"
                margin="dense"
                value={novaCidade}
                onChange={(e) => setNovaCidade(e.target.value)}
              />

              <Box mt={2} display="flex" gap={1}>
                <Button variant="contained" onClick={salvarPerfil}>Salvar</Button>
                <Button onClick={() => {
                  setEditandoPerfil(false);
                  setNovoNome(user.displayName || '');
                  setNovaAtuacao(user.atuacao || '');
                  setNovoPreco(user.preco || '');
                  setNovaCidade(user.cidade || '');
                }}>Cancelar</Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h6">{user.displayName}</Typography>
              <Typography variant="body2">{user.atuacao || 'Nenhuma atuação informada'}</Typography>
              <Typography variant="body2">{user.preco ? `R$ ${user.preco}/h` : 'Valor não informado'}</Typography>
              <Typography variant="body2">{user.cidade || 'Cidade não informada'}</Typography>

              <Box my={2}>
                <Link href={`/perfil/${user.uid}`} underline="none" rel="noopener noreferrer">
                  <Button variant="outlined">Ver meu perfil público</Button>
                </Link>
              </Box>

              <LogoutButton />
            </>
          )}
        </Card>


        {/* Contato */}
        <Card sx={{ boxShadow: 1, border: '1px solid #bbdefb', borderRadius: 2, p: 2, backgroundColor: '#f5faff' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" fontWeight={600}>
              {tipoConta === 'profissional' ? 'Informações pessoais' : 'Contato'}
            </Typography>
            <IconButton size="small" onClick={() => setEditandoContato(!editandoContato)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>

          {editandoContato ? (
            <>
              <TextField fullWidth label="WhatsApp" margin="dense" value={contato.whatsapp}
                onChange={(e) => setContato({ ...contato, whatsapp: e.target.value })} />
              <TextField fullWidth label="Instagram" margin="dense" value={contato.instagram}
                onChange={(e) => setContato({ ...contato, instagram: e.target.value })} />
              <TextField fullWidth label="Facebook" margin="dense" value={contato.facebook}
                onChange={(e) => setContato({ ...contato, facebook: e.target.value })} />
              <TextField fullWidth label="LinkedIn" margin="dense" value={contato.linkedin}
                onChange={(e) => setContato({ ...contato, linkedin: e.target.value })} />
              <TextField fullWidth label="Email" margin="dense" value={user.email} disabled />

              <Box mt={2}>
                <Button variant="contained" onClick={salvarContato}>Salvar</Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="body2">WhatsApp: {user.whatsapp || 'Não informado'}</Typography>
              <Typography variant="body2">Instagram: {user.instagram || 'Não informado'}</Typography>
              <Typography variant="body2">Facebook: {user.facebook || 'Não informado'}</Typography>
              <Typography variant="body2">LinkedIn: {user.linkedin || 'Não informado'}</Typography>
              <Typography variant="body2">Email: {user.email}</Typography>
            </>
          )}
        </Card>

        {/* Sobre mim */}
        <Card sx={{ boxShadow: 1, border: '1px solid #bbdefb', borderRadius: 2, p: 2, backgroundColor: '#f5faff' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" fontWeight={600}>Sobre mim</Typography>
            {!editandoSobre && (
              <IconButton size="small" onClick={() => setEditandoSobre(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          {editandoSobre ? (
            <>
              <TextField fullWidth multiline rows={4} value={novoSobre}
                onChange={(e) => setNovoSobre(e.target.value)} />
              <Box mt={1} display="flex" gap={1}>
                <Button variant="contained" size="small" onClick={salvarSobre}>Salvar</Button>
                <Button size="small" onClick={() => {
                  setNovoSobre(user.sobreMim || '');
                  setEditandoSobre(false);
                }}>Cancelar</Button>
              </Box>
            </>
          ) : (
            <Typography variant="body2">{user.sobreMim || 'Nenhuma informação ainda.'}</Typography>
          )}
        </Card>

        {/* Certificações */}
        {tipoConta === 'profissional' && (
          <Card
            sx={{
              boxShadow: 1,
              border: '1px solid #bbdefb',
              borderRadius: 2,
              p: 2,
              backgroundColor: '#f5faff',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                Certificações
              </Typography>
              <IconButton size="small" onClick={() => setEditandoCertificacoes(!editandoCertificacoes)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>

            {editandoCertificacoes ? (
              <>
                {certificacoes.map((cert: any, idx: number) => (
                  <Card
                    key={idx}
                    variant="outlined"
                    sx={{ mb: 2, p: 2, position: 'relative', background: '#fff' }}
                  >
                    <Box display="flex" flexDirection="column" gap={2}>
                      <TextField
                        label="Curso"
                        value={cert.nome}
                        onChange={(e) => {
                          const nova = [...certificacoes];
                          nova[idx].nome = e.target.value;
                          setCertificacoes(nova);
                        }}
                      />
                      <TextField
                        label="Instituição"
                        value={cert.instituicao || ''}
                        onChange={(e) => {
                          const nova = [...certificacoes];
                          nova[idx].instituicao = e.target.value;
                          setCertificacoes(nova);
                        }}
                      />
                      <TextField
                        label="Data"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={cert.data}
                        onChange={(e) => {
                          const nova = [...certificacoes];
                          nova[idx].data = e.target.value;
                          setCertificacoes(nova);
                        }}
                      />
                      <Button
                        color="error"
                        onClick={() => {
                          const nova = certificacoes.filter((_, i) => i !== idx);
                          setCertificacoes(nova);
                        }}
                      >
                        Remover
                      </Button>
                    </Box>
                  </Card>
                ))}

                <Box display="flex" gap={1} flexWrap="wrap">
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setCertificacoes([...certificacoes, { nome: '', instituicao: '', data: '' }])
                    }
                  >
                    + Adicionar nova certificação
                  </Button>
                  <Button variant="contained" onClick={salvarCertificacoes}>
                    Salvar todas
                  </Button>
                  <Button onClick={() => setEditandoCertificacoes(false)}>Cancelar</Button>
                </Box>
              </>
            ) : (
              <>
                {user.certificacoes?.length ? (
                  user.certificacoes.map((cert: any, idx: number) => (
                    <Card key={idx} variant="outlined" sx={{ mb: 2, p: 2 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {cert.nome}
                      </Typography>
                      <Typography variant="body2">
                        {cert.instituicao} —{' '}
                        {cert.data ? new Date(cert.data).toLocaleDateString('pt-BR') : 'Data não informada'}
                      </Typography>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2">Nenhuma certificação cadastrada.</Typography>
                )}
              </>
            )}
          </Card>
        )}


        {tipoConta === 'profissional' && (
          <Card sx={{ boxShadow: 1, border: '1px solid #bbdefb', borderRadius: 2, p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Vagas que me candidatei
            </Typography>

            {candidaturas.length === 0 ? (
              <Typography variant="body2">Você ainda não se candidatou a nenhuma vaga.</Typography>
            ) : (
              candidaturas.map(vaga => (
                <Box key={vaga.id} sx={{ mb: 2 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {vaga.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Data: {vaga.data?.toDate ? new Date(vaga.data.toDate()).toLocaleDateString('pt-BR') : '---'}
                  </Typography>
                  <Link href={`/vagas/${vaga.id}`} underline="hover">
                    Ver detalhes da vaga
                  </Link>
                </Box>
              ))
            )}
          </Card>
        )}
        {/* Vagas para empresa */}
        {tipoConta === 'empresa' && (
          <>
            <Typography variant="subtitle1" fontWeight={600}>
              Vagas de empregos criadas
            </Typography>
            <Link href="/vagas/criar" underline="hover">Criar vaga</Link>
            <Card sx={{ boxShadow: 1, border: '1px solid #bbdefb', borderRadius: 2, p: 2, backgroundColor: '#f5faff' }}>
              <Typography variant="body2" fontWeight={600}>Vagas Eletricistas</Typography>
              <Typography variant="body2">Criada em: 15/06/2025</Typography>
              <Typography variant="body2">Total de interessados: 15</Typography>
              <Box mt={1}>
                <Link href="#" underline="hover">Baixar todos os currículos</Link>
              </Box>
            </Card>
            <Typography variant="subtitle1">Candidatos</Typography>
            {vagasCriadas.map(vaga => (
              <Card key={vaga.id} sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {vaga.titulo}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Criada em: {vaga.dataPublicacao?.toDate ? new Date(vaga.dataPublicacao.toDate()).toLocaleDateString('pt-BR') : '---'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total de candidatos: {candidatosPorVaga[vaga.id]?.length || 0}
                </Typography>

                {candidatosPorVaga[vaga.id]?.map(c => (
                  <Box key={c.uid} sx={{ mt: 1, pl: 2 }}>
                    <Typography variant="body2">👤 {c.nome}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Data: {c.data?.toDate ? new Date(c.data.toDate()).toLocaleDateString('pt-BR') : '---'}
                    </Typography>
                    <Link href={`/perfil/${c.uid}`} underline="hover">
                      Ver perfil
                    </Link>
                  </Box>
                ))}
              </Card>
            ))}
          </>
        )}

      </Stack>
    </Container>
  );
}
