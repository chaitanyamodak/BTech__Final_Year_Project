import { Course } from "../models/course.model.js";
import { Faculty } from "../models/faculty.model.js";

const addCourse = async (req, res) => {
  try {
    const { _id } = req.user;
    const { courseName, courseCode, maximumMarks } = req.body;

    const courseExists = await Course.exists({ courseCode });

    if (courseExists) {
      return res.status(400).json({ message: "Course already exists" });
    }

    if (!courseCode || !courseName || !maximumMarks) {
      return res.status(400).json({ message: "all fields are required" });
    } else {
      const course = await Course.create({
        courseCode,
        courseName,
        maximumMarks,
      });
      await Faculty.updateOne(
        { _id },
        { $push: { courses: course._id } },
        { new: true }
      );
      return res.status(200).json(req.user);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCoursesByFaculty = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await Faculty.findById(_id).populate("courses");
    const courses = user.courses.map((course) => {
      const courseData = course.toObject();
      const createdAtDate = new Date(courseData.createdAt);
      // Format date to desired format
      const formattedDate = createdAtDate.toLocaleString("hi-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      // Return the course object with formatted date
      return {
        ...courseData,
        createdAt: createdAtDate,
        formattedCreatedAt: formattedDate,
      };
    });
    // Sort the courses array by createdAt date in descending order
    courses.sort((a, b) => b.createdAt - a.createdAt);
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { addCourse, getCoursesByFaculty };
