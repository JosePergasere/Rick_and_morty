require("dotenv").config();
const express = require("express");
const router = require("./routes/index");

const PORT = process.env.PORT || 3001;

const server = express();

server.use(express.json()); //Transforma en un obj la req recibida

server.use("/rickandmorty", router);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
