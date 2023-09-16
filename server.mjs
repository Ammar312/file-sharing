import express from "express";
import connectDB from "./db.mjs";
import Routes from "./routes/index.mjs";
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use("/api", Routes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
