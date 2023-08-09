import express, { Application } from "express";
import http from "http";
import AppRouter from "./API";
require("dotenv").config();
const cors = require('cors')

const port = Number(process.env.SERVER_PORT)||5000;

const app: Application = express();

app.use(express.json());
app.use(cors() )

app.use('/api', AppRouter)

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
