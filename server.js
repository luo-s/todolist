import express from "express";
import pg from "pg";
import dotenv from "dotenv";
dotenv.donfig();

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

server.listen(PORT, function () {
  console.log(`listening on port: ${PORT}`);
});
