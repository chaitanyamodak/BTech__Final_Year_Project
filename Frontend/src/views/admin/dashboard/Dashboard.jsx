import React from "react";
import ExamCard from "../../../components/ExamCard/ExamCard";
import axios from "axios";
import { useEffect, useState } from "react";

const ExamDashboard = () => {
  const [exams, setExams] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3000/exam/get-exams")
      .then((res) => {
        setExams((prevExams) => res.data.exams); // Using functional update to ensure re-render
        setLoading(false);
        console.log(res.data.exams);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Empty dependency array to fetch data only once when component mounts

  return (
    <div className="mt-3 grid h-full  gap-5 ">
      <div className="h-fit w-full ">
        {/* Recenlty Added setion */}
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Scheduled Exams
          </h4>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {exams.map((exam, index) => {
            return (
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExamDashboard;
