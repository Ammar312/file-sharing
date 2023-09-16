import express from "express";
import multer from "multer";
import path from "path";
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

router.post("/files", (res, req) => {});

export default router;
