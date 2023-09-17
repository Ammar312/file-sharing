import express from "express";
import Files from "./files.mjs";
import Show from "./show.mjs";
import Download from "./download.mjs";
let router = express.Router();

router.use(Files);
router.use(Show);
router.use(Download);

export default router;
