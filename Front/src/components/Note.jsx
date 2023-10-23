import { useState } from 'react';
import axios from 'axios';
import { URL_NOTES } from '../constants';
import { Box, Card, CardContent, CardHeader, CardMedia, IconButton, Stack, Typography, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NoteModal from './NoteModal';

/* COMPONENTE DE CADA TARJETA CON LA NOTA. */
const Note = ({ data, notesCall }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

//ENVIO DE DATA PARA BORRAR. SE CAPTURA EL ID CON LA DATA QUE LLEGA DEL MAP EN BLOG.JSX
    const handleDelete = async () => {
        await axios.delete(`${URL_NOTES}/${data.id}`)
        notesCall();
    }

    return (
        <Card sx={{ maxWidth: 300, padding: 2, border: "solid 1px whitesmoke", borderRadius: "15px", mb: 8 }}>
            <Box component="div" sx={{ display: "grid", gridTemplateColumns: "80% 1fr" }}>
                <CardHeader
                    sx={{ color: theme.palette.primary.main }}
                    title={data.title}
                />
                <Stack direction="column" spacing={1} sx={{ mb: 2 }}>
                    <IconButton sx={{ fontWeight: 800, borderRadius: "5px" }}
                        onClick={handleDelete}
                    >
                        <DeleteForeverIcon fontSize="small" />
                    </IconButton>
                    <IconButton sx={{ borderRadius: "5px" }} onClick={() => setOpen(true)} >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </Box>
            <Stack direction="column" spacing={2}>
                <CardMedia
                    component="img"
                    width="100%"
                    image={data.image}
                />
                <CardContent sx={{ backgroundColor: theme.palette.primary.main, borderRadius: "15px" }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: "#001199" }}>
                        {data.note}
                    </Typography>
                </CardContent>
            </Stack>
            <NoteModal open={open} setOpen={setOpen} id={data.id} notesCall={notesCall} />
        </Card >
    );
}

export default Note