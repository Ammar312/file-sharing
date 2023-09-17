import express from "express";
import File from "../model/file.mjs";
let router = express.Router();

router.get("/showfile/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({
      uuid: req.params.uuid,
    });
    if (!file) {
      return res.render("download", { error: "Link has been expired" });
    }
    return res.render("download", {
      uuid: file.uuid,
      fileName: file.filename,
      fileSize: file.size,
      downloadLink: `${process.env.APP_BASE_URL}/api/file/download/${file.uuid}`,
    });
  } catch (err) {
    return res.render("download", { error: "Something went wrong" });
  }
});

export default router;
