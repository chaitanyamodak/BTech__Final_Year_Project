import { Exam } from "../models/exam.model.js";
import { Student } from "../models/student.model.js";

const updateActivityCount = async (req, res) => {
  try {
    const examCode = req.params["examCode"];
    const studentId = req.params["studentId"];
    const { activity } = req.body;
    console.log(examCode, studentId, activity);

    const exam = await Exam.findOneAndUpdate(
      { examCode, "monitoringData.student": studentId },
      { $inc: { [`monitoringData.$.${activity}`]: 1 } },
      { new: true }
    );
    if (!exam) {
      return res.status(404).json({ message: "Exam or student not found" });
    }

    const studentData = exam.monitoringData.find(
      (data) => data.student == studentId
    );

    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({
      message: "Activity count updated successfully",
      studentData,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateSubmitStatus = async (req, res) => {
  try {
    // const examCode = req.params["examCode"];
    // const studentId = req.params["studentId"];

    const { examCode, studentId } = req.body;

    const updatedExam = await Exam.findOneAndUpdate(
      { examCode, "monitoringData.student": studentId },
      { $set: { "monitoringData.$.submissionStatus": true } },
      { new: true }
    );

    if (!updatedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const studentData = updatedExam.monitoringData.find(
      (data) => data.student == studentId
    );

    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res
      .status(200)
      .json({ message: "Exam ended successfully", studentData });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateStartTime = async (req, res) => {
  try {
    const examCode = req.params["examCode"];
    const studentId = req.params["studentId"];
    const { startTime } = req.body;

    const updatedExam = await Exam.findOneAndUpdate(
      { examCode, "monitoringData.student": studentId },
      { $set: { "monitoringData.$.startTime": startTime } },
      { new: true }
    );

    if (!updatedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    return res
      .status(200)
      .json({ message: "Exam started successfully for student" });
  } catch (error) {
    console.error("Error starting exam for student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const examSubmission = async (req, res) => {
  try {
    const examCode = req.params["examCode"];
    const studentId = req.params["studentId"];

    const { resultCode, resultOutput } = req.body;

    // Update the monitoring data in the exam document
    const updatedExam = await Exam.findOneAndUpdate(
      { examCode, "monitoringData.student": studentId },
      {
        $set: {
          "monitoringData.$.result": { resultCode, resultOutput },
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedExam) {
      return res.status(404).json({ message: "Exam or student not found" });
    }

    return res.status(200).json({ exam: updatedExam });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const viewSubmission = async (req, res) => {
  try {
    const examCode = req.params["examCode"];
    const prn = req.params["prn"];

    const student = await Student.findOne({ prn });
    console.log(student._id);

    // const submissionData = await Exam.findOne({
    //   examCode,
    //   "monitoringData.student": student._id,
    // });

    const submissionData = await Exam.findOne({
      examCode,
      "monitoringData.student": student._id,
    });

    if (!submissionData || !submissionData.monitoringData[0]) {
      return res.status(404).json({ error: "Submission data not found" });
    }

    // Find the submission data for the specific student
    const studentSubmission = submissionData.monitoringData.find(
      (data) => data.student.toString() === student._id.toString()
    );

    // Return the submission data for the particular student
    return res.status(200).json(studentSubmission.result);

    // if (!submissionData || !submissionData.monitoringData[0]) {
    //   return res.status(404).json({ error: "Submission data not found" });
    // }

    // return res.status(200).json(student._id);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  updateActivityCount,
  updateSubmitStatus,
  updateStartTime,
  examSubmission,
  viewSubmission,
};
