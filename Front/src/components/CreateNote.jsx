import { useState } from "react";
import { Box, Button, Paper, Stack, TextField, Typography, styled } from "@mui/material";
import axios from "axios";
import { URL_NOTES } from "../constants";


const initialInputValues = {
    title: "",
    image: "",
    note: "",
};

/* ESTE COMPONENTE SIRVE PARA CREAR UNA NOTA.  */
//notesCall es para actualizar la llamada de blog.jsx
const CreateNote = ({ notesCall }) => {
    const [inputValues, setInputValues] = useState(initialInputValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };

    //axios para crear
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${URL_NOTES}/create`, inputValues)
        setInputValues(initialInputValues)
        notesCall();
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Paper elevation={3} sx={{ padding: "1em", borderRadius: "0.5em" }}>
            <Typography variant="h4" textAlign="center">Crear Nota</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <Stack direction="column" spacing={2}>
                    <Stack direction="column" spacing={2}>
                        <TextField
                            label="Titulo"
                            placeholder="Ingrese titulo"
                            value={inputValues.title}
                            name="title"
                            type="text"
                            onChange={handleInputChange}
                            fullWidth
                            sx={{ mt: 4, mb: 4 }}
                        />
                        <TextField
                            label="Imagen"
                            placeholder="Ingrese URL de imagen"
                            value={inputValues.image}
                            name="image"
                            type="text"
                            onChange={handleInputChange}
                            fullWidth
                            sx={{ mt: 4, mb: 4 }}
                        />
                        <Button component="label" variant="outlined" disabled>
                            Upload file
                            <VisuallyHiddenInput type="file" />
                        </Button>
                        <TextField
                            label="Nota"
                            placeholder="Ingrese texto"
                            value={inputValues.note}
                            name="note"
                            type="text"
                            onChange={handleInputChange}
                            fullWidth
                            sx={{ mt: 4, mb: 4 }}
                        />
                    </Stack>
                    <Button variant="contained" fullWidth type="submit" sx={{ color: "#000C6D", fontWeight: 600 }} >Enviar</Button>
                </Stack>
            </Box>
        </Paper>
    )
}

export default CreateNote