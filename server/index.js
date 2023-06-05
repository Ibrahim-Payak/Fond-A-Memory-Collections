import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

//add /post in all routes url

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// route should be after app.use(cors());
app.use("/posts", postRoutes);

app.get("/", (req, res) => res.send("This is Fond API"));

//include in .env file to upload this code in public (since it's consist of username & pwd)
// const CONNECTION_URL = "mongodb+srv://Itsibu:Ibu4123@cluster0.z9rbx2w.mongodb.net/";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
