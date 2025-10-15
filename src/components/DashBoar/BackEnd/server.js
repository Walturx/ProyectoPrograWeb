import express from "express";
import cors from "cors";
import connection from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/usuarios", (req, res) => {
  connection.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      res.status(500).send("Error al obtener usuarios");
    } else {
      res.json(results);
    }
  });
});


app.get("/usuarios/:id", (req, res) => {
  const id = req.params.id;

  connection.query("SELECT * FROM usuarios WHERE Us_ID = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener el usuario");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("Usuario no encontrado");
      return;
    }

    res.json(results[0]);
  });
});

app.listen(5000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:5000");
});
