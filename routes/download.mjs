import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import File from "../model/file.mjs";
let router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/file/download/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });

    if (!file) {
      res.render("download", { error: "Link has been expired" });
      return;
    }
    console.log(__dirname);
    const filePath = `${__dirname}/../${file.path}`;
    res.download(filePath);
  } catch (error) {
    console.log(error);
  }
});

export default router;
