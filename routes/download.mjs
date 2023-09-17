import express from "express";
let router = express.Router();
import File from "../model/file.mjs";

router.get("/file/download/:uuid", async (req, res) => {
  const file = await File.findOne({ uuid: req.params.uuid });

  if (!file) {
    return res.render("download", { error: "Link has been expired" });
  }
});

export default router;
