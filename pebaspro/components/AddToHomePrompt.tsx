'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';

export default function AddToHomePrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) return;

    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      if (isMobile) {
        setDeferredPrompt(e);
        setVisible(true);
      }
    });
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      localStorage.setItem('pwa-install-dismissed', 'true');
      setVisible(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        right: 16,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 999,
      }}
    >
      <Typography variant="body1" gutterBottom>
        Instale o app PebasPro e tenha acesso rápido na tela inicial!
      </Typography>
      <Box display="flex" gap={2} mt={1}>
        <Button variant="contained" onClick={handleInstall}>
          Instalar
        </Button>
        <Button onClick={handleDismiss}>Agora não</Button>
      </Box>
    </Paper>
  );
}
