import { useEffect, useState } from "react";
import axios from "axios";
import { URL_NOTES } from "../constants";
import { Box, Container, Typography, styled } from "@mui/material";
import Navbar from "../components/Navbar";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";

/* ESTE COMPONENTE ES PARA RENDERIZAR LAS NOTAS Y EL CUADRO DE CREACION */
//onLogout es para cerrar sesion y borrar el localStorage.
const Blog = ({ onLogout }) => {
    const [notes, setNotes] = useState([]);

    //Llamada al back de las notas
    const notesCall = async () => {
        const call = await axios.get(URL_NOTES);
        const data = call.data.notes;

        setNotes(data);
    };

    useEffect(() => {
        //Puse el notesCall para hacer el llamado y rerenderizar la pagina.
        notesCall();
    }, [])

    const StyledDiv = styled(Box)(({ theme }) => ({
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridGap: theme.spacing(2),
    }))

    return (
        <>
            <Navbar onLogout={onLogout} />
            <Container maxWidth="lg">
                <StyledDiv component="div" >
                    <Box component="div" sx={{ display: "grid", gridColumn: "1/4", gridTemplateRows: "1fr 1fr", textAlign: "center" }}>
                        <Typography variant="h2">Bienvenido a tu Blog!</Typography>
                        <Typography variant="body2">Aquí podras realizar tus notas</Typography>
                    </Box>
                    <Box component="div" sx={{ display: "grid", gridColumn: "2/3" }}>
                        <CreateNote notesCall={notesCall} />
                    </Box>
                    {
                        //El siguiente map lo que hace el mostrar las cartas a los costados segun su index par o inpar.
                        notes.map((note, i) => (
                            <Box key={i} component="div" sx={{ gridColumn: i % 2 === 0 ? "1/2" : "3/4", margin: "auto" }}>
                                <Note data={note} notesCall={notesCall} />
                            </Box>
                        ))
                    }
                </StyledDiv>
            </Container>
        </>
    );
}

export default Blog;