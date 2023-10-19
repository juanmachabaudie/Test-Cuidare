//Llamada a la base de datos
const { db } = require("../../index");

const notesController = {

  //Funcion para crear una nota
  createNote: async (req, res) => {
    try {
      const { title, image, note } = req.body;

      await db.collection("notes").add({
        title,
        image,
        note,
      });
      res.json({
        message: "Note created",
      });
    } catch (error) {
      res.json({
        message: "Something went wrong",
      });
    }
  },

  //Funcion para traer todas las notas
  getAllNotes: async (req, res) => {
    try {
      const notes = await db.collection("notes").get();
      res.json({
        notes: notes.docs.map((note) => ({
          id: note.id,
          ...note.data(),
        })),
      });
    } catch (error) {
      res.json({
        message: "Something went wrong",
      });
    }
  },

  //Funcion para traer una nota segun el titulo
  getNoteById: async (req, res) => {
    const { id } = req.params;
    try {
      const note = await db.collection("notes").doc(id).get();
      res.json({
        note: { id: note.id, ...note.data() },
      });
    } catch (error) {
      res.json({
        message: "Something went wrong",
      });
    }
  },

  //Funcion para actualizar una nota.
  updateNote: async (req, res) => {
    const { id } = req.params;
    const { title, image, note } = req.body;
    try {
      await db.collection("notes").doc(id).set(
        {
          title,
          image,
          note,
        },
        { merge: true }
      );
      res.json({
        message: "Updated",
      });
    } catch (error) {
      res.json({
        message: "Something went wrong",
      });
    }
  },

  //Funcion para borrar una nota
  deleteNote: async (req, res) => {
    const { id } = req.params;
    try {
      await db.collection("notes").doc(id).delete();
      res.json({
        message: "Note deleted",
      });
    } catch (error) {
      res.json({
        message: "Something went wrong",
      });
    }
  },
};

module.exports = notesController;