import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import File from "../model/file.mjs";
import sendMail from "../services/emailService.mjs";
import { mailTemplate } from "../services/emailTemplate.mjs";
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

router.post("/send", async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;
  if (!uuid || !emailTo || !emailFrom) {
    res.status(422).send({
      error: "Required Parameter Missing",
    });
    return;
  }
  try {
    const file = await File.findOne({ uuid: uuid });
    if (file.sender) {
      return res.send({ error: "Email already sent!" });
    }
    file.sender = emailFrom;
    file.reciever = emailTo;
    const response = await file.save();
    // SEND EMAIL
    sendMail({
      from: emailFrom,
      to: emailTo,
      subject: "File Sharing",
      text: `${emailFrom} shared a file with you.`,
      html: mailTemplate({
        emailFrom,
        downloadLink: `${process.env.APP_BASE_URL}/api/file/download${file.uuid}?source=email`,
        size: parseInt(file.size / 1000) + " KB",
        expires: "24 hours",
      }),
    });
    res.send({
      success: true,
    });
  } catch (error) {}
});

export default router;
