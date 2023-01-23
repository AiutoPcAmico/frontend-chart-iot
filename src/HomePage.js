import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Chart } from './Chart';
import { ListErrors } from './ListErrors';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBlock: '3px'
}));

export function HomePage({ openedPage }) {
    return (
        <Box className={'application'} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        {openedPage === "Grafico" &&
                            <p className='titols'>Grafico</p>
                            &&
                            <Chart></Chart>
                        }
                        {openedPage === "Lista Errori" &&
                            <p className='titols'>Lista Errori</p> &&
                            <ListErrors></ListErrors>
                        }

                    </Item>
                </Grid>

            </Grid>
        </Box>
    );
}