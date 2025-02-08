import { Router } from "express";
import { verifyJWT } from "../middlewares/faculty.auth.middleware.js";
import { getFacultyProfile } from "../controllers/faculty.controller.js";

const router = Router();

router.route("/get-profile").get(verifyJWT, getFacultyProfile);

export default router;
