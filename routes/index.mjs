import express from "express";
import Files from "./files.mjs";
let router = express.Router();

router.use(Files);

export default router;
