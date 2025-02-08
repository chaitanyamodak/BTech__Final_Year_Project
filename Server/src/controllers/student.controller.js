import { Student } from "../models/student.model.js";

const getStudentProfile = async (req, res) => {
  try {
    const id = req.student._id;

    const student = await Student.findById(id);

    if (student) {
      return res.status(200).json({ student });
    }
    return res.status(404).json({ message: "Student not found" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getStudentProfile };
