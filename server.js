import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const server = express();
const PORT = 3000;

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

server.use(express.json());
server.use(express.static("public"));

server.get("/todo", (req, res) => {
  db.query("SELECT * FROM todo").then((result) => {
    res.status(200).send(result.rows);
  });
});

server.post("/todo", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO todo (name) VALUES ($1) RETURNING *", [name]).then(
    (data) => {
      res.send(data.rows[0]);
    }
  );
});

server.listen(PORT, function () {
  console.log(`listening on port: ${PORT}`);
});
