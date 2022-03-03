import 'dotenv/config'
import express = require("express");
import cors = require("cors");
import routes from "./routes/index.routes";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", routes);


export default app;