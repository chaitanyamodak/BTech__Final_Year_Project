import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const facultySchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "please add the faculty email"],
    },
    name: {
      type: String,
      required: [true, "please add the faculty name"],
    },
    password: {
      type: String,
      required: [true, "please add the faculty password"],
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    exams: [
      {
        type: Schema.Types.ObjectId,
        ref: "Exam",
      },
    ],
  },
  { timestamps: true }
);

facultySchema.methods.generateFacultyAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.SECRET_ACCESS_KEY,
    {
      expiresIn: "1d",
    }
  );
};

export const Faculty = mongoose.model("Faculty", facultySchema);
