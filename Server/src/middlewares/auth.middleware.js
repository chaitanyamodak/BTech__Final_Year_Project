import jwt from "jsonwebtoken";
import { Student } from "../models/student.model.js";
// const SECRET_ACCESS_KEY =
//   "9edc8c307afb04c99bac5b1bdb205e34cb007a7618e857e46fc5dd31a694b8068aa096e8918bf2866d16600deae6e918d56cb5d1eaebf46d7c857cd2712b60e4";

// const verifyJWT = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null) {
//     return res.status(401).json({ error: "No access token" });
//   }

//   jwt.verify(token, SECRET_ACCESS_KEY, (err, user) => {
//     if (err) {
//       res.status(403).json({ error: "Access token invalid" });
//     }
//     req.user = user.id;
//     next();
//   });
// };

// const formatDataToSend = (user) => {
//   const access_token = jwt.sign({ id: user._id }, SECRET_ACCESS_KEY);
//   return {
//     access_token,
//     email: user.email,
//     name: user.name,
//   };
// };

// export { verifyJWT, formatDataToSend };

export const verifyJWTStudent = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "No access token" });
    }

    const decodedToken = await jwt.verify(token, process.env.SECRET_ACCESS_KEY);

    const student = await Student.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!student) {
      // TODO : FRONTEND
      return res.status(401).json({ error: "Invalid access token" });
    }

    req.student = student;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid access token" });
  }
};
