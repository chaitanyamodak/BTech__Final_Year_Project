import { Exam } from "../models/exam.model.js";
import { Faculty } from "../models/faculty.model.js";
import moment from "moment";

const createExam = async (req, res) => {
  try {
    const { _id } = req.user;
    const formData = req.body;

    const {
      course,
      examCode,
      examDate,
      examTime,
      examDuration,
      year,
      division,
      batch,
      problemStatements,
      enableVideoProctoring,
      enableAudioProctoring,
    } = formData;

    const exam = await Exam.create({
      course,
      examCode,
      examDate,
      examTime,
      examDuration,
      year,
      division,
      batch,
      problemStatements,
      enableVideoProctoring,
      enableAudioProctoring,
    });

    await Faculty.updateOne(
      { _id },
      { $push: { exams: exam._id } },
      { new: true }
    );

    const populatedExam = await Exam.populate(exam, {
      path: "monitoringData.student",
      select: "_id email name prn",
    });

    if (populatedExam) {
      return res.status(200).json({
        message: "Exam created successfully",
        exam: populatedExam,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getExams = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await Faculty.findById(_id).populate("exams");

    const sortedExams = user.exams.sort((a, b) => b.createdAt - a.createdAt);

    const exams = sortedExams.map((exam) => {
      const examData = exam.toObject();
      const createdAtDate = new Date(examData.createdAt);
      // Format date to desired format
      const formattedDate = createdAtDate.toLocaleString("hi-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      // Return the exam object with formatted date
      return {
        ...examData,
        createdAt: createdAtDate,
        formattedCreatedAt: formattedDate,
      };
    });

    if (exams) {
      return res.status(200).json({ exams });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getExamByCode = async (req, res) => {
  try {
    const examCode = req.params["examcode"];

    const exam = await Exam.findOne({ examCode });

    // if (exam) {
    return res.status(200).json({ exam });
    // }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Backend Controller

const getExamDetailsByCode = async (req, res) => {
  try {
    const examCode = req.params["examcode"];

    // Fetch exam details based on exam code
    const exam = await Exam.findOne({ examCode }).populate(
      "monitoringData.student"
    );

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Format the response data as needed
    const formattedExam = {
      course: exam.course,
      examCode: exam.examCode,
      // Include other exam details as needed
      monitoringData: exam.monitoringData.map((data) => ({
        studentName: data.student.name,
        studentPrn: data.student.prn,
        startTime: data.startTime,
        tabChangeCount: data.tabChangeCount,
        copyPasteCount: data.copyPasteCount,
        hardwareDetectedCount: data.hardwareDetectedCount,
        noFaceDetectedCount: data.noFaceDetectedCount,
        submissionStatus: data.submissionStatus,
      })),
    };

    return res.status(200).json({ exam: formattedExam });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCompletedExams = async (req, res) => {
  try {
    const currentDateTime = moment(); // Get current datetime
    const currentFormattedDate = currentDateTime.format("DD/MM/YYYY");
    const currentFormattedTime = currentDateTime.format("HH:mm");

    // Get all exams from the database
    const allExams = await Exam.find({});

    // Filter completed exams based on start time + duration being less than current time
    const completedExams = allExams.filter((exam) => {
      const startDateTime = moment(
        `${exam.examDate} ${exam.examTime}`,
        "DD/MM/YYYY HH:mm"
      );
      const endDateTime = startDateTime.clone().add(exam.examDuration, "hours");
      return endDateTime.isBefore(currentDateTime);
    });

    return res.status(200).json({ completedExams });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getExamByStudent = async (req, res) => {
  try {
    const { year, division, batch } = req.body;
    const studentId = req.student._id;

    const exams = await Exam.find({
      year,
      division,
      batch,
      monitoringData: {
        $elemMatch: {
          student: studentId,
          submissionStatus: false,
        },
      },
    }).select("-monitoringData");

    return res.status(200).json({ exams });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProblemStatementForStudent = async (req, res) => {
  try {
    const examId = req.params["examId"];
    const studentId = req.params["studentId"];
    console.log(examId, studentId);

    let exam = await Exam.find({ examCode: examId }).select("monitoringData");
    exam = exam[0];

    if (!exam) {
      return res.status(400).json({ message: "Exam not found" });
    }

    const studentData = exam.monitoringData.find(
      (data) => data.student == studentId
    );

    // // Find the monitoring data for the specific student
    // const monitoringDataForStudent = exam.monitoringData.find(
    //   (data) => data.student.toString() === studentId
    // );

    // if (!monitoringDataForStudent) {
    //   return res
    //     .status(404)
    //     .json({ message: "Monitoring data not found for the student" });
    // }

    // Extract the problem statement for the student
    //  const problemStatement = monitoringDataForStudent.problemStatement;

    return res.status(200).json(studentData.problemStatement);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMonitoringDataByStudent = async (req, res) => {
  try {
    const examId = req.params["examId"];
    const studentId = req.params["studentId"];
    console.log(examId, studentId);

    let exam = await Exam.find({ examCode: examId }).select("monitoringData");
    exam = exam[0];

    if (!exam) {
      return res.status(400).json({ message: "Exam not found" });
    }

    const studentData = exam.monitoringData.find(
      (data) => data.student == studentId
    );

    return res.status(200).json(studentData);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCompletedExamByStudent = async (req, res) => {
  try {
    const { year, division, batch } = req.body;
    const studentId = req.student._id;

    const exams = await Exam.find({
      year,
      division,
      batch,
      monitoringData: {
        $elemMatch: {
          student: studentId,
          submissionStatus: true,
        },
      },
    }).select("-monitoringData");

    return res.status(200).json({ exams });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  createExam,
  getExams,
  getExamByCode,
  getExamDetailsByCode,
  getCompletedExams,
  getExamByStudent,
  getProblemStatementForStudent,
  getMonitoringDataByStudent,
  getCompletedExamByStudent,
};
