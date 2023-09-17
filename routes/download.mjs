import express from "express";
let router = express.Router();
import File from "../model/file.mjs";

router.get("/files/download/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });

    if (!file) {
      return res.render("download", { error: "Link has been expired" });
    }
    const filePath = `${__dirname}/../${file.path}`;
    res.download(filePath);
  } catch (error) {}
});

export default router;
