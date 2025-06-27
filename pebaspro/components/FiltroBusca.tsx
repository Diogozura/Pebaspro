'use client';

import { Box, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

interface Props {
  onBuscar: (filtros: { servico: string; regiao: string }) => void;
}

export default function FiltroBusca({ onBuscar }: Props) {
  const [servico, setServico] = useState('');
  const [regiao, setRegiao] = useState('');

  const handleBuscar = () => {
    onBuscar({ servico, regiao });
  };

  return (
    <Box display="flex" gap={2} mb={3} flexWrap="nowrap" justifyContent="center">
      <Select value={servico} fullWidth onChange={(e: SelectChangeEvent) => setServico(e.target.value)} displayEmpty>
        <MenuItem value="">Serviço</MenuItem>
        <MenuItem value="eletricista">Eletricista</MenuItem>
        <MenuItem value="encanador">Encanador</MenuItem>
      </Select>
      <Select value={regiao} fullWidth onChange={(e: SelectChangeEvent) => setRegiao(e.target.value)} displayEmpty>
        <MenuItem value="">Região</MenuItem>
        <MenuItem value="parauapebas">Parauapebas</MenuItem>
        <MenuItem value="marabá">Marabá</MenuItem>
      </Select>
      <Button variant="contained" onClick={handleBuscar} sx={{ backgroundColor: '#f7941d' }}>
        Buscar
      </Button>
    </Box>
  );
}
