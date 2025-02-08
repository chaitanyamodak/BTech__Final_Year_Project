import { Router } from "express";
import { verifyJWTStudent } from "../middlewares/auth.middleware.js";
import { getStudentProfile } from "../controllers/student.controller.js";

const router = Router();

router.route("/get-student-profile").post(verifyJWTStudent, getStudentProfile);

export default router;
