import React from "react";
import ExamCard from "../../../components/ExamCard/ExamCard";
import axios from "axios";
import { useEffect, useState } from "react";
import UserContext from "../../../contexts/UserContext";

const CompletedExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  // let { user, setUser } = React.useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/exam/get-completed-exams")
      .then((res) => {
        setExams(res.data.completedExams);
        setLoading(false);
        console.log(res.data.completedExams);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("Exams:", exams);

  return (
    <div className="mt-3 grid h-full  gap-5 ">
      <div className="h-fit w-full ">
        {/* Recenlty Added setion */}
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Completed Exams
          </h4>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {Array.isArray(exams) && exams.length === 0 ? (
            <p>No completed exams</p>
          ) : (
            exams.map((exam, index) => (
              <div key={index}>
                <ExamCard
                  courseName={exam.course}
                  secretCode={exam.examCode}
                  examDateTime={exam.examDate + " " + exam.examTime}
                  examDuration={exam.examDuration}
                  year={exam.year}
                  division={exam.division}
                  batch={exam.batch}
                  status={"Starts on " + exam.examDate + " " + exam.examTime}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletedExams;
