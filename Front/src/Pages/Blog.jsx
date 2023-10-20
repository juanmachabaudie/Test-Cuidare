import { useEffect, useState } from "react";
import axios from "axios";
import { URL_NOTES } from "../constants";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Navbar from "../components/Navbar";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";




const Blog = ({ onLogout }) => {
    const [notes, setNotes] = useState([]);

    const notesCall = async () => {
        const call = await axios.get(URL_NOTES);
        const data = call.data.notes;

        setNotes(data);
    };

    useEffect(() => {
        notesCall();
    }, [])

    const handleDelete = async (id) => {
        await axios.delete(`${URL_NOTES}/${id}`)
        notesCall();
    }

    return (
        <>
            <Navbar onLogout={onLogout} />
            <Container maxWidth="lg">
                <Grid container sx={{ mt: "1em" }} spacing={3} >
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                        <Typography variant="h2">Bienvenido a tu Blog!</Typography>
                        <Typography variant="body2">Aquí podras realizar tus notas</Typography>
                    </Grid>
                    <Grid item xsOffset={4} xs={4}>
                        <CreateNote notesCall={notesCall}/>
                    </Grid>
                    <Grid item container display="flex" justifyContent="space-between" xs={12}>
                        {
                            notes.map((note, i) => (
                                <Grid item xs={4} key={i}>
                                    <Note key={i} data={note} handleDelete={handleDelete} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Blog;