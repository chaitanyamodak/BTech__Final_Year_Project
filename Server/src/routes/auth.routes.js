import { Router } from "express";
import {
  registerStudent,
  registerFaculty,
  loginStudent,
  loginFaculty,
  facultyLogout,
  refreshAccessToken,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/faculty.auth.middleware.js";

const router = Router();

router.route("/student/signup").post(registerStudent);
router.route("/faculty/signup").post(registerFaculty);

router.route("/student/login").post(loginStudent);
router.route("/faculty/login").post(loginFaculty);

router.route("/faculty/logout").get(verifyJWT, facultyLogout);

router.route("/refresh-token").post(refreshAccessToken);
export default router;
