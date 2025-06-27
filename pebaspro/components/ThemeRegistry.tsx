'use client';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ReactNode } from 'react';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Quicksand', // Usando Quicksand como a fonte padrão
            'sans-serif',
        ].join(','),
        // h4: {
        //   fontFamily: 'Radio Canada, sans-serif', // Aplicando Radio Canada ao H2
        // },
        // h5: {
        //   fontFamily: 'Radio Canada, sans-serif', // Aplicando Radio Canada ao H3
        // },
    },
    palette: {
        primary: {
            main: '#FFBD39', // laranja
            contrastText: '#5E5E5E',
        },
        secondary: {
            main: '#ff5722', // laranja escuro
            contrastText: '#5E5E5E',
        },
        error: {
            main: '#DA2A2A', // vermelho escuro
        },
        warning: {
            main: '#ffa000', // laranja escuro
        },
        info: {
            main: '#0288d1', // azul escuro
        },
        success: {
            main: '#388e3c', // verde escuro
        },
        background: {
            default: '#f4f4f4', // fundo escuro
            paper: '#f4f4f4', // papel escuro
        },
        text: {
            primary: '#5E5E5E', // texto branco
            secondary: '#b0bec5', // texto cinza claro
        },
    },});

export default function ThemeRegistry({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
