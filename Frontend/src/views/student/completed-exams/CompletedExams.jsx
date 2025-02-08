import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import StudentExamCard from "../../../components/ExamCard/StudentExamCard";

const CompletedExams = () => {
  const student = useSelector((state) => state.authData.user.student);
  const [completedExams, setCompletedExams] = useState([]);

  useEffect(() => {
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN +
          "/exam/get-completed-exam-by-student",
        {
          year: student.year,
          division: student.division,
          batch: student.batch,
        }
      )
      .then(({ data }) => {
        console.log(data);
        setCompletedExams(data.exams);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-3 grid h-full  gap-5 ">
      <div className="h-fit w-full ">
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Completed Exams
          </h4>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {completedExams.map((exam, index) => {
            return (
              <div key={index}>
                <StudentExamCard
                  courseName={exam.course}
                  examDate={exam.examDate}
                  examTime={exam.examTime}
                  examDuration={exam.examDuration}
                  year={exam.year}
                  division={exam.division}
                  batch={exam.batch}
                  status="completed"
                  examCode={exam.examCode}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompletedExams;
