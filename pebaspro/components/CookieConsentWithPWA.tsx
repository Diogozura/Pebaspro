'use client';

import { useEffect, useState } from 'react';
import { Snackbar, Box, Typography, Button } from '@mui/material';

export default function CookieConsent({ onAccepted }: { onAccepted: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) setShow(true);
    else onAccepted(); // já aceitou antes, pode mostrar PWA
  }, []);

  const aceitarCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShow(false);
    onAccepted(); // agora pode mostrar o AddToHomePrompt
  };

  if (!show) return null;

  return (
    <Snackbar
      open
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      message={
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body2">
            Usamos cookies para melhorar sua experiência no PebasPro.
          </Typography>
          <Button variant="contained" size="small" sx={{ mt: 1 }} onClick={aceitarCookies}>
            Aceitar
          </Button>
        </Box>
      }
    />
  );
}
