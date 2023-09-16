import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import File from "../model/file.mjs";
let router = express.Router();
let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
let upload = multer({
  storage,
  limits: { fileSize: 1000000 * 50 },
}).single("myFile");

router.post("/files", (req, res) => {
  upload(req, res, async (err) => {
    if (!req.file) {
      res.send({
        error: "All fields are required",
      });
      return;
    }

    if (err) {
      res.status(500).send({
        error: err.message,
      });
      return;
    }
    // Store in database
    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      uuid: uuidv4(),
      size: req.file.size,
    });
    const response = await file.save();
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });
});

export default router;
