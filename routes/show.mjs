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
  } catch (err) {
    return res.render("download", { error: "Something went wrong" });
  }
});

export default router;
