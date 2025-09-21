import express from "express";
import { config } from "dotenv"
import { log } from "console";
import { bootstrap } from "./app.controller";
import { devConfig } from "./config/dev.env";
config()
const app = express();
const port = devConfig.PORT
app.listen(port, () => {
    log("application is running on port", port); 
});
bootstrap(app,express)
