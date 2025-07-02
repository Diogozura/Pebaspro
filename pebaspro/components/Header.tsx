'use client';

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useAuth } from '@/hooks/useAuth';


export default function Header() {
const { user } = useAuth();
const isLoggedIn = !!user;

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Profissionais', href: '/profissionais' },
    { label: 'Vagas', href: '/vagas' },
    { label: 'Contato', href: '/contato' },
    { label: 'Faq', href: '/faq' },
  ];

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      
      <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
        {/* Logo - sempre visível */}
        <Box display="flex" alignItems="center">
          <Link href="/">
            <Image src="/logo.png" alt="PebasPro" width={60} height={60} />
          </Link>
        </Box>

        {/* Menus - visível apenas em md+ */}
        <Box
          display={{ xs: 'none', md: 'flex' }}
          alignItems="center"
          gap={2}
        >
          {menuItems.map((item) => (
            <Button
              key={item.href}
              component={Link}
              href={item.href}
              color="inherit"
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Ações (login / ícones) - visível apenas em md+ */}
        <Box
          display={{ xs: 'none', md: 'flex' }}
          alignItems="center"
          gap={1}
        >
          {isLoggedIn ? (
            <>
              <IconButton component={Link} href="/perfil" color="inherit">
                <PersonIcon />
              </IconButton>
              <IconButton>
                <ChatBubbleIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button component={Link} href="/auth/login" color="inherit">
                Entrar
              </Button>
              <Button
                component={Link}
                href="/auth/cadastro"
                variant="contained"
                sx={{
                  backgroundColor: '#f7931e',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#e67e00' },
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
