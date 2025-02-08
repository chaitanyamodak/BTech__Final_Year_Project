import jwt from "jsonwebtoken";
import { Faculty } from "../models/faculty.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "No access token" });
    }

    const decodedToken = await jwt.verify(token, process.env.SECRET_ACCESS_KEY);

    const faculty = await Faculty.findById(decodedToken._id).select(
      "-password"
    );

    if (!faculty) {
      // TODO : FRONTEND
      return res.status(401).json({ error: "Invalid access token" });
    }

    req.user = faculty;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid access token" });
  }
};
