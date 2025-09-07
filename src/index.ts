import express from "express";
import { config } from "dotenv"
import { log } from "console";
import { bootstrap } from "./app.controller";
config({ path: "./config/dev.env" })
const app = express();
const port = process.env.PORT
app.listen(port, () => {
    log("application is running on port", port);
});
bootstrap(app,express)
