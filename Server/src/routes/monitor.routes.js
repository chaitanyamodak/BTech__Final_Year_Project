import { Router } from "express";
import {
  updateActivityCount,
  updateStartTime,
  updateSubmitStatus,
  examSubmission,
  viewSubmission,
} from "../controllers/monitor.controller.js";

const router = Router();

router.route("/update-count/:examCode/:studentId").post(updateActivityCount);
router.route("/submit-exam").post(updateSubmitStatus);
router.route("/update-start-time/:examCode/:studentId").post(updateStartTime);
router.route("/exam-submission/:examCode/:studentId").post(examSubmission);
router.route("/view-exam-submission/:examCode/:prn").post(viewSubmission);

export default router;
