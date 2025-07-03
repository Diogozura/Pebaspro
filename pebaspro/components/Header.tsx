'use client';

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: '#fff' }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 } }}>
        {/* Logo */}
        <Link href="/" passHref>
          <Typography variant="h6" fontWeight={700} color="primary" sx={{ textDecoration: 'none' }}>
            Paraua<strong style={{ color: '#1976d2' }}>Profissionais</strong>
          </Typography>
        </Link>

        {/* Menu de Navegação */}
        <Box display={{ xs: 'none', md: 'flex' }} alignItems="center" gap={2}>
          <Button
            startIcon={<HomeIcon />}
            component={Link}
            href="/"
            sx={{
              bgcolor: '#f1f4f9',
              color: 'black',
              textTransform: 'none',
              '&:hover': { bgcolor: '#e1e7ef' },
            }}
          >
            Home
          </Button>

          {/* Serviços com Dropdown */}
          <Button
            startIcon={<SearchIcon />}
            endIcon={<ExpandMoreIcon />}
            onClick={handleOpen}
            sx={{ color: 'black', textTransform: 'none' }}
          >
            Serviços
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem component={Link} href="/profissionais" onClick={handleClose}>
              Buscar Prestadores
            </MenuItem>
            <MenuItem component={Link} href="/cadastro" onClick={handleClose}>
              Quero me Cadastrar
            </MenuItem>
          </Menu>

          <Button startIcon={<WorkIcon />} component={Link} href="/vagas" sx={{ color: 'black', textTransform: 'none' }}>
            Trabalhos
          </Button>

          {isLoggedIn && (
            <Button startIcon={<PersonIcon />} component={Link} href="/perfil" sx={{ color: 'black', textTransform: 'none' }}>
              Perfil
            </Button>
          )}

          <Button startIcon={<HelpOutlineIcon />} component={Link} href="/faq" sx={{ color: 'black', textTransform: 'none' }}>
            FAQ
          </Button>
        </Box>

        {/* Ações: Login ou Usuário Logado */}
        <Box display={{ xs: 'none', md: 'flex' }} alignItems="center" gap={1}>
          {isLoggedIn ? (
            <>
              <IconButton component={Link} href="/perfil" color="default">
                <PersonIcon />
              </IconButton>
              <IconButton component={Link} href="/chat" color="default">
                <ChatBubbleOutlineIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button component={Link} href="/auth/login" sx={{ color: '#555', textTransform: 'none' }}>
                Entrar
              </Button>
              <Button
                component={Link}
                href="/auth/cadastro"
                variant="contained"
                sx={{
                  bgcolor: '#1976d2',
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  px: 2,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#1565c0' },
                }}
              >
                Cadastrar
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
