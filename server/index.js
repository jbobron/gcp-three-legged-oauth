import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import CloudStorageController from "./CloudStorageController.js";
import AuthController from "./AuthController.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    // Sets Access-Control-Allow-Origin to the UI URI
    origin: "http://localhost:3000",
    // Sets Access-Control-Allow-Credentials to true
    credentials: true,
  })
);

// DO NOT SET DEFAULT ROUTE SO WE CAN SERVE REACT via express.static
// app.get("/")
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "server/build")));

app.get("/status", (req, res) => {
  res.send({
    status: 200,
    message: "hello api",
    redirect_uri: process.env.REDIRECT_URI,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });
});





app.use("/api/cloud-storage", CloudStorageController);
app.use("/api/auth", AuthController);


const port = process.env.PORT || 4000;

const server = app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});