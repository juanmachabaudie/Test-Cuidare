import { useState } from "react";
import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/* ESTE ES UN SENCILLO LOGIN QUE ALMACENA EN LOCALSTORAGE POR 5 MINUTOS LA SESION */

const Login = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        // Valida la clave
        if (password === 'CuidareTest') {
            localStorage.setItem('isLoggedIn', 'true');
            onLogin();
            navigate("/blog")
        } else {
            alert('Clave incorrecta');
        }
    };

    return (
        <Container maxWidth="lg">
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "100vh" }}
            >
                <Grid item>
                    <Paper elevation={3} sx={{ padding: "1em", borderRadius: "0.5em" }}>
                        <Typography variant="h4" textAlign="center">Iniciar sesion</Typography>
                        <Box component="form" onSubmit={handleLogin}>
                            <TextField
                                label="Clave"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingrese clave"
                                type="password"
                                fullWidth
                                sx={{ mt: 4, mb: 4 }}
                            />
                            <Button variant="outlined" fullWidth type="submit" >Ingresar</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;
