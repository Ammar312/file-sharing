import express from "express";
import Files from "./files.mjs";
import Show from "./show.mjs";
let router = express.Router();

router.use(Files);
router.use(Show);

export default router;
