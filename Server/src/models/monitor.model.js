import mongoose, { Schema } from "mongoose";

const monitorSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    startTime: {
      type: Date,
    },
    tabChangeCount: {
      type: Number,
      default: 0,
    },
    copyPasteCount: {
      type: Number,
      default: 0,
    },
    hardwareDetectedCount: {
      type: Number,
      default: 0,
    },
    noFaceDetectedCount: {
      type: Number,
      default: 0,
    },
    submissionStatus: {
      type: Boolean,
      default: false,
    },
    result: {
      resultCode: {
        type: String,
      },
      resultOutput: {
        type: String,
      },
    },
  },

  { timestamps: true }
);

export const Monitor = mongoose.model("Monitor", monitorSchema);
