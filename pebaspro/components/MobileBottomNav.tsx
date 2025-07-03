'use client';

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddToHomePrompt from './AddToHomePrompt';
import ConstructionIcon from '@mui/icons-material/Construction';
export default function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState(pathname);

  useEffect(() => {
    setValue(pathname);
  }, [pathname]);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: 'block', sm: 'none' },
        zIndex: 1000,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          router.push(newValue);
        }}
      >
        <AddToHomePrompt />
        <BottomNavigationAction label="Trabalhos" value="/vagas" icon={<WorkIcon />} />
        <BottomNavigationAction label="Profissionais" value="/profissionais" icon={<ConstructionIcon />} />
        <BottomNavigationAction label="Perfil" value="/perfil" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
