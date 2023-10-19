const { onRequest } = require("firebase-functions/v2/https")
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
    res.json({
        message:
            `
            Cuidare-Test API. En la lista debajo podras encontrar las rutas:
            - /notes → Devuelve todas las notas.
            - /notes/create → Crea una nota. Los parametros son "title", "image" y "note".
            - /notes/:id → Devuelve una nota segun su ID. (GET)
            - /notes/:id → Edita una nota segun su ID. Los parametros son "title", "image" y "note". (PUT)
            - /notes/:id → Borra una nota segun su ID. (DELETE)
            `,
    });
});

app.use("/", routes);

app.use((req, res) => {
    res.json({
        error: {
            name: "Error",
            status: 404,
            message: "Invalid Request",
            statusCode: 404,
        },
    });
});

exports.app = onRequest(app);
