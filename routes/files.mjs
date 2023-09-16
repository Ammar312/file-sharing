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

router.post("/files", (res, req) => {
  if (!req.file) {
    res.send({
      error: "All fields are required",
    });
    return;
  }
  upload(req, res, (err) => {
    if (err) {
      res.status(500).send({
        error: err.message,
      });
      return;
    }
    // Store in database
  });
});

export default router;
