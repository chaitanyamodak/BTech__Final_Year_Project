import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
      unique: true,
    },
    maximumMarks: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
