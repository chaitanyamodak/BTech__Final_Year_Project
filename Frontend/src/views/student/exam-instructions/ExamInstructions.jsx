import React, { useState, useEffect } from "react";
import Card from "../../../components/Card/Card";
import InputField from "../../../components/InputField/InputField";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setExamId } from "../../../features/current-exam/currentExamSlice";
import Modal from "../../../components/Modal/Modal";
import axios from "axios";
import { unstable_usePrompt } from "react-router-dom";
import ReactRouterPrompt from "react-router-prompt";
import EndExamModal from "../../../components/Modal/EndExam";

const ExamInstructions = () => {
  const [tabChanges, setTabChanges] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [enteredExamCode, setEnteredExamCode] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const student = useSelector((state) => state.authData.user.student);

  // unstable_usePrompt({
  //   message: "Are you sure?",
  //   when: ({ currentLocation, nextLocation }) =>
  //     currentLocation.pathname !== nextLocation.pathname,
  // });

  const { courseName, examCode } = location.state;
  console.log(courseName, examCode);

  const handleGoBack = () => {
    console.log("In handleGoBack");
    setOpen(true);
    setActivity("endExam");
    alert("You are not allowed to go back");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleGoBack);

    return () => {
      window.removeEventListener("beforeunload", handleGoBack);
    };
  }, []);

  const updateExamStartTime = (startTime) => {
    axios
      .post(
        `http://localhost:3000/monitor/update-start-time/${examCode}/${student._id}`,
        {
          startTime,
        }
      )
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleStartExam = () => {
    if (enteredExamCode === examCode) {
      const startTime = Date.now();
      updateExamStartTime(startTime);
      navigate(`/exam/${examCode}`);
      dispatch(setExamId(examCode));
    } else {
      setError("Invalid Exam Code");
    }
  };

  return (
    <Card extra={"w-full h-full p-3 mt-9"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full  px-5">
        <h4 className=" text-xl font-bold text-navy-700 dark:text-white">
          Exam Instructions
        </h4>
        <div className="mt-2  text-gray-900 font-medium dark:text-white/60">
          <ul className="list-decimal space-y-4">
            <li>
              Candidates shall be allowed to enter the laboratory 10 minutes
              before the actual schedule.
            </li>
            <li>
              Experiments shall be allotted to the students by lot. If the
              allotted experiment had not been performed by the candidate
              (Evidenced by journal), such a candidate, on his/her demand will
              have an option to pick a lot for alternative experiment. Under
              such cases, 10 marks be deducted out of the marks obtained in the
              paper. No further chance to change the allotted experiment shall
              be given and the candidate shall perform the experiment without
              further option.
            </li>
            <li>
              The examiner shall give all the necessary instructions to the
              candidates prior to the schedule of particular paper.
            </li>
          </ul>
        </div>
      </div>
      {/* Cards */}
      <div className="relative mb-10 px-2 w-fit flex justify-center items-center">
        <InputField
          label="Enter Exam Code*"
          id="examCode"
          name="examCode"
          placeholder="Enter Exam Code"
          extra="w-60"
          value={enteredExamCode}
          onChange={(e) => setEnteredExamCode(e.target.value)}
        />
        <div className="px-2">
          <button
            onClick={handleStartExam}
            className="p-3 mt-8 rounded-lg ml-2 bg-blueSecondary text-white hover:bg-blueSecondary/90"
          >
            Start Exam
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-500 absolute bottom-5 left-7">{error}</p>
      )}
    </Card>
  );
};

export default ExamInstructions;
