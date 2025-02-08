import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../../../components/Modal/Modal";
import { setCode } from "../../../../features/result/resultSlice";
import EndExamModal from "../../../../components/Modal/EndExam";
import { useNavigate } from "react-router-dom";

const Problem = ({ ps }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState("");
  const navigate = useNavigate();
  const monitoringData = useSelector((state) => state.monitoringData.monitor);
  const student = useSelector((state) => state.authData.user.student);

  const allotedProblemStatement = ps;
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const examId = useSelector((state) => state.currentExamData.examId);
  console.log(monitoringData.problemStatement);

  const handleEndExam = () => {
    navigate("/write-answers", { replace: true });
    // setOpen(true);
    // setActivity("endExam");
    // dispatch(setCode(""));
  };

  return (
    <div className="p-4 relative h-full">
      <EndExamModal
        activity={activity}
        open={open}
        onClose={() => setOpen(false)}
      ></EndExamModal>
      <div>
        <p className="font-semibold">PRN : {student.prn}</p>
        <p className="font-semibold">Name: {student.name}</p>
      </div>
      <p className="font-semibold mt-10">Alloted Problem Statement : </p>

      <p className="mt-5">{monitoringData.problemStatement}</p>

      <button
        className="absolute bottom-5 rounded-lg font-semibold p-4 bg-blueSecondary text-white"
        onClick={handleEndExam}
      >
        End Exam
      </button>
    </div>
  );
};

export default Problem;
