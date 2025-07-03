'use client';

import {
    Avatar,
    Box,
    Button,
    Card,
    IconButton,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutButton from '@/components/LogoutButton';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import React from 'react';

export default function PerfilPrincipalCard({ user }: { user: any }) {
    const [editandoPerfil, setEditandoPerfil] = React.useState(false);
    const [novoNome, setNovoNome] = React.useState(user.displayName || '');
    const [novaAtuacao, setNovaAtuacao] = React.useState(user.atuacao || '');
    const [novoPreco, setNovoPreco] = React.useState(user.preco || '');
    const [novaCidade, setNovaCidade] = React.useState(user.cidade || '');

    const salvarPerfil = async () => {
        await updateDoc(doc(db, 'usuarios', user.uid), {
            displayName: novoNome,
            atuacao: novaAtuacao,
            preco: novoPreco,
            cidade: novaCidade,
        });
        setEditandoPerfil(false);
    };

    return (
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
                        fullWidth label="Nome" margin="dense"
                        value={novoNome} onChange={(e) => setNovoNome(e.target.value)}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="atuacao-label">Área de atuação</InputLabel>
                        <Select
                            labelId="atuacao-label"
                            value={novaAtuacao}
                            label="Área de atuação"
                            onChange={(e) => setNovaAtuacao(e.target.value)}
                        >
                            <MenuItem value="Pedreiro">Pedreiro</MenuItem>
                            <MenuItem value="Encanador">Encanador</MenuItem>
                            <MenuItem value="Eletricista">Eletricista</MenuItem>
                            <MenuItem value="Pintor">Pintor</MenuItem>
                            <MenuItem value="Diarista">Diarista</MenuItem>
                            <MenuItem value="Soldador">Soldador</MenuItem>
                            <MenuItem value="Mecânico">Mecânico</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth label="Preço por hora" margin="dense"
                        value={novoPreco} onChange={(e) => setNovoPreco(e.target.value)}
                    />
                    <TextField
                        fullWidth label="Cidade" margin="dense"
                        value={novaCidade} onChange={(e) => setNovaCidade(e.target.value)}
                    />

                    <Box mt={2} display="flex" gap={1}>
                        <Button variant="contained" onClick={salvarPerfil}>Salvar</Button>
                        <Button onClick={() => {
                            setEditandoPerfil(false);
                            setNovoNome(user.displayName || '');
                            setNovaAtuacao(user.atuacao || '');
                            setNovoPreco(user.preco || '');
                            setNovaCidade(user.cidade || '');
                        }}>
                            Cancelar
                        </Button>
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
    );
}
