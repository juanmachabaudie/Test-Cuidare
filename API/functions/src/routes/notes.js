//En este archivo manejo las variantes de la ruta "notes".

const router = require("express");

const routers = router();

const notesController = require("../controllers/notesController");

routers.get("/", notesController.getAllNotes);
routers.get("/:id", notesController.getNoteById);
routers.post("/create", notesController.createNote);
routers.put("/:id", notesController.updateNote);
routers.delete("/:id", notesController.deleteNote);

module.exports = routers;
