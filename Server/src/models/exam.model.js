import mongoose, { Schema } from "mongoose";
import { Student } from "./student.model.js";

const examSchema = new Schema(
  {
    course: {
      type: String,
      required: true,
    },
    examCode: {
      type: String,
      required: true,
      unique: true,
    },
    examDate: {
      type: String,
      required: true,
    },

    examTime: {
      type: String,
      required: true,
    },
    examDuration: {
      type: Number,
      required: true,
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
    problemStatements: [
      {
        type: String,
        required: true,
      },
    ],
    enableVideoProctoring: {
      type: Boolean,
      required: true,
    },
    enableAudioProctoring: {
      type: Boolean,
      required: true,
    },
    monitoringData: [
      {
        student: {
          type: Schema.Types.ObjectId,
          ref: "Student",
        },
        problemStatement: {
          type: String,
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
    ],
  },
  { timestamps: true }
);

examSchema.pre("save", async function (next) {
  try {
    const students = await Student.find({
      year: this.year,
      division: this.division,
      batch: this.batch,
    });

    const shuffledProblemStatements = shuffle(this.problemStatements);

    const monitoringData = students.map((student, index) => {
      const problemStatement =
        shuffledProblemStatements[index % shuffledProblemStatements.length];
      return {
        student: student._id,
        problemStatement,
        startTime: null,
        tabChangeCount: 0,
        copyPasteCount: 0,
        hardwareDetectedCount: 0,
        noFaceDetectedCount: 0,
        submissionStatus: false,
        result: {
          resultCode: "",
          resultOutput: "",
        },
      };
    });

    this.monitoringData = monitoringData;
    next();
  } catch (error) {
    next(error);
  }
});

function shuffle(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const Exam = mongoose.model("Exam", examSchema);
