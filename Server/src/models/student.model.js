import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const studentSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    prn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    year: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

studentSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      prn: this.prn,
    },
    process.env.SECRET_ACCESS_KEY,
    {
      expiresIn: "1d",
    }
  );
};

studentSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.SECRET_ACCESS_KEY,
    {
      expiresIn: "5d",
    }
  );
};

export const Student = mongoose.model("Student", studentSchema);
