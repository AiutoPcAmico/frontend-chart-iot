import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Chart } from './Chart';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBlock: '3px'
}));

export function HomePage() {
    return (
        <Box className={'application'} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <p className='titols'>Grafico</p>
                <Grid item xs={12}>
                    <Item><Chart></Chart></Item>
                </Grid>

            </Grid>
        </Box>
    );
}