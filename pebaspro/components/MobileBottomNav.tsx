'use client';

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
        <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction label="Trabalhos" value="/vagas" icon={<WorkIcon />} />
        <BottomNavigationAction label="Perfil" value="/dashboard" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
