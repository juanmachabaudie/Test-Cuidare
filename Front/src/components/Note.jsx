import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { URL_NOTES } from '../constants';
import { Button, Card, CardContent, CardHeader, CardMedia, Stack, Typography, useTheme } from '@mui/material';

const Note = ({ data, handleDelete }) => {
    const [detail, setDetail] = useState([]);
    const id = useParams()
    const theme = useTheme();

    useEffect(() => {
        const noteCall = async () => {
            const call = await axios.get(`${URL_NOTES}/${id}`)
            const data = call.data.note
            setDetail(data);
        }
        noteCall();
    }, [])

    return (
        <Card sx={{ maxWidth: 350, padding: 2, border: "solid 1px whitesmoke", position: "relative" }}>
            <CardHeader
                sx={{ color: theme.palette.primary.main }}
                title={data.title}
            />
            <Button sx={{ position: "absolute", right: 0, top: "10px", fontWeight: 800 }} onClick={() => handleDelete(data.id)} >X</Button>
            <Stack direction="column" spacing={2}>
                <CardMedia
                    component="img"
                    height={200}
                    image={data.image}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="inherit" color="text.secondary" sx={{ fontWeight: 400 }}>
                        {data.note}
                    </Typography>
                </CardContent>
            </Stack>
        </Card>
    );
}

export default Note