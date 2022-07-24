import express from "express";
import requestRouter from "./routes/request.routes.js"
import { promises as fs } from "fs"


const { readFile } = fs;
global.fileName = "requests.json";


const app = express();
app.use(express.json());

app.use("/requests", requestRouter);

app.listen(3000, async () => {
    try {
        await readFile(global.fileName)
        console.log("Pedidos up");
    } catch (error) {
        console.log("Pedidos down");
    }

});
