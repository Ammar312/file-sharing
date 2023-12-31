import express from "express";
import connectDB from "./db.mjs";
import Routes from "./routes/index.mjs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.set("views", path.join(__dirname, "/view"));
app.set("view engine", "ejs");

app.use("/api", Routes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
