import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from '@mui/material'


/* NAVBAR SENCILLO CON UN TEXTO Y UN BOTON PARA CIERRE DE SESION */
const Navbar = ({ onLogout }) => {

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        onLogout();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <Container maxWidth="lg">
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography variant='h4'>Cuidare Test</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant='outlined' size='small' onClick={handleLogout}>Cerrar Sesion</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar