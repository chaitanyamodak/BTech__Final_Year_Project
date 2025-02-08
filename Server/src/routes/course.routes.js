import express, { Router } from "express";
import {
  addCourse,
  getCoursesByFaculty,
} from "../controllers/course.controller.js";
import { verifyJWT } from "../middlewares/faculty.auth.middleware.js";

const router = Router();

router.route("/add-course").post(verifyJWT, addCourse);
router.route("/get-courses-by-faculty").post(verifyJWT, getCoursesByFaculty);

export default router;
