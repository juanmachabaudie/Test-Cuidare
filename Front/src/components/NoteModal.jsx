import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Modal, Paper, Typography, CardMedia, useTheme, Stack, CardContent, IconButton, CardHeader, Slide, TextField, Button } from '@mui/material';
import { URL_NOTES } from '../constants';
import Clear from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

/* ESTE COMPONENTE QUEDO MUY LARGO Y ME GUSTARIA PODER DIVIDIRLO EN PEQUENIAS PARTES PERO YA ES TIEMPO DE ENTREGAR :( */
/* LO QUE QUERIA ERA RECICLAR EL COMPONENTE NOTE PARA PODER EDITAR PERO NO LO LOGRE. LOGRE ALGO UN POQUITO MEJOR PERO REPITIENDO CODIGO */
/* DEPENDIENDO DEL CAMPO QUE SE DESEA MODIFICAR, RENDERIZA UN INPUT U OTRO. Y ALMACENO LOS DATOS QUE VIENEN DE BACK PARA AUTOCOMPLETAR CADA INPUT. */
const NoteModal = ({ open, setOpen, id, notesCall }) => {
    const [inputValues, setInputValues] = useState({
        title: "",
        image: "",
        note: "",
    });
    const [note, setNote] = useState([])
    const [editTitle, setEditTitle] = useState(false)
    const [editImage, setEditImage] = useState(false)
    const [editNote, setEditNote] = useState(false)
    const theme = useTheme();

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (param) => {
        switch (param) {
            case "title":
                setEditTitle(!editTitle)
                break;
            case "image":
                setEditImage(!editImage)
                break;
            case "note":
                setEditNote(!editNote)
                break;
            default:
                break;
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };

    const noteCall = async () => {
        const call = await axios.get(`${URL_NOTES}/${id}`)
        const data = call.data.note
        setNote(data);
        setInputValues({
            title: data.title,
            image: data.image,
            note: data.note,
        })
    }

    //MODIFICACION DE NOTA LIMPIANDO ESTADOS
    const noteEdited = async (e) => {
        e.preventDefault()
        await axios.put(`${URL_NOTES}/${id}`, inputValues);
        setEditTitle(false)
        setEditImage(false)
        setEditNote(false)
        setOpen(false)
        setNote(inputValues);
        notesCall();
    }

    useEffect(() => {
        noteCall();
    }, [id])


    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box component={editTitle || editImage || editNote ? "form" : "div"} onSubmit={noteEdited} sx={{ display: "grid", height: "100vh", placeItems: "center" }}>
                <Paper elevation={5} sx={{ padding: 3, display: "grid", gridTemplateRows: "repeat(300px, 3)", minHeight: "60%", borderRadius: "15px", border: "solid 1px whitesmoke" }}>
                    <Box component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            {
                                editTitle ? (
                                    <Slide direction="up" in={editTitle} mountOnEnter unmountOnExit>
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
                                    </Slide>
                                ) : (
                                    <CardHeader
                                        sx={{ color: theme.palette.primary.main }}
                                        title={note.title}
                                    />
                                )}
                            <IconButton onClick={() => handleEdit("title")}>
                                <EditIcon fontSize='small' />
                            </IconButton>
                        </Stack>
                        <IconButton onClick={handleClose}>
                            <Clear fontSize='small' />
                        </IconButton>
                    </Box>
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {
                                editImage ? (
                                    <Slide direction="up" in={editImage} mountOnEnter unmountOnExit>
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
                                    </Slide>
                                ) : (
                                    <CardMedia
                                        component="img"
                                        height={200}
                                        image={note.image}
                                    />
                                )
                            }
                            <IconButton onClick={() => handleEdit("image")}>
                                <EditIcon fontSize='small' />
                            </IconButton>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {
                                editNote ? (
                                    <Slide direction="up" in={editNote} mountOnEnter unmountOnExit>
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
                                    </Slide>
                                ) : (
                                    <CardContent sx={{ backgroundColor: theme.palette.primary.main, borderRadius: "15px" }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600, color: "#001199" }}>
                                            {note.note}
                                        </Typography>
                                    </CardContent>
                                )
                            }
                            <IconButton onClick={() => handleEdit("note")}>
                                <EditIcon fontSize='small' />
                            </IconButton>
                        </Stack>
                    </Stack>
                    {
                        editTitle || editImage || editNote ? (
                            <Box component="div" sx={{ mt: 3, mb: 1 }}>
                                <Button type='submit' fullWidth>Enviar</Button>
                            </Box>
                        ) : null
                    }
                </Paper>
            </Box>
        </Modal >
    )
}

export default NoteModal