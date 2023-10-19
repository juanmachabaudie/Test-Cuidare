//En este archivo creo la ruta de notas y manejo las variantes desde su propio archivo "notes"

const router = require("express");

const notesRoute = require("./notes");

const routers = router();

routers.use("/notes", notesRoute);

module.exports = routers;
