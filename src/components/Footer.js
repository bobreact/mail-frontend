import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function Footer() {
    return (
        <footer>
            <Box
                px={{ xs: 3, sm: 5 }}
                py={{ xs: 5, sm: 5 }}
                
                color="white"
                className='bg-slate-600'
            >
                <Container maxWidth="lg">
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>Help</Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Contact
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Support
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Privacy
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>Account</Box>
                            <Box>
                                <Link to="/login" color="inherit">
                                    Login
                                </Link>
                            </Box>
                            <Box>
                                <Link to="/register" color="inherit">
                                    Register
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>Messages</Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Backup
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    History
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Roll
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1}>Social</Box>
                            <Box>
                                <Link href="https://fr-fr.facebook.com/" color="inherit">
                                    Social
                                </Link>
                            </Box>

                        </Grid>

                    </Grid>
                    <Box textAlign="center" pt={{ xs: 5, sm: 2 }} pb={{ xs: 5, sm: 0 }}>

                        <Stack direction="row" spacing={2} style={{ textAlign: "center" }} >
                            <Avatar>A</Avatar>
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
                            <Avatar sx={{ bgcolor: deepPurple[500] }}>B</Avatar>
                            &reg; {new Date().getFullYear()}
                        </Stack>



                    </Box>
                </Container>
            </Box>
        </footer>
    );
}