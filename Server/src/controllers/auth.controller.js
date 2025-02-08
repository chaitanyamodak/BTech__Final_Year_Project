import { Student } from "../models/student.model.js";
import { Faculty } from "../models/faculty.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await Student.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error.message);
  }
};

const options = {
  httpOnly: true,
  secure: true,
};

const registerStudent = async (req, res) => {
  try {
    const { email, name, prn, year, division, batch, password } = req.body;

    const studentExists = await Student.exists({ email });
    if (studentExists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const student = await Student.create({
      email,
      name,
      prn,
      year,
      division,
      batch,
      password,
    });

    res
      .status(201)
      .json({ message: "Student registered successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerFaculty = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const facultyExists = await Faculty.exists({ email });

    if (facultyExists) {
      return res.status(400).json({ message: "Faculty already exists" });
    }

    const faculty = await Faculty.create({
      email,
      name,
      password,
    });

    res
      .status(201)
      .json({ message: "Faculty registered successfully", faculty });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      student._id
    );
    const loggedInStudent = await Student.findById(student._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ student: loggedInStudent, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginFaculty = async (req, res) => {
  try {
    const { email, password } = req.body;

    const faculty = await Faculty.findOne({ email });

    if (!faculty) {
      return res.status(400).json({ message: "Faculty not found" });
    }

    if (faculty.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = await faculty.generateFacultyAccessToken();

    console.log("in faculty methods", accessToken);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json({ accessToken });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const facultyLogout = async (req, res) => {
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json({ message: "Logged out successfully" });
};

const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.SECRET_ACCESS_KEY
    );

    const student = await Student.findById(decodedToken._id);

    if (!student) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    if (incomingRefreshToken !== student?.refreshToken) {
      return res
        .status(401)
        .json({ error: "refresh token is expired or used" });
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(student._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        accessToken,
        newRefreshToken,
        message: "Access token is refreshed",
      });
  } catch (error) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};

export {
  registerStudent,
  registerFaculty,
  loginStudent,
  loginFaculty,
  facultyLogout,
  refreshAccessToken,
};
