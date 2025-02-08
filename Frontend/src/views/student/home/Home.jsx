import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import StudentExamCard from "../../../components/ExamCard/StudentExamCard";
import { ThreeDots } from "react-loader-spinner";

const Home = () => {
  const [exams, setExams] = useState([]);
  const student = useSelector((state) => state.authData.user.student);
  const [loading, setLoading] = useState(false);
  console.log(student);
  const getExams = async () => {
    try {
      setLoading(true);
      axios
        .post("http://localhost:3000/exam/get-exam-by-student", {
          year: student.year,
          division: student.division,
          batch: student.batch,
        })
        .then((response) => {
          console.log(response.data.exams);
          setExams(response.data.exams);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  let date = new Date(exams.examDate);
  date = date.toLocaleDateString("hi-IN");

  return (
    <div className="mt-3 grid h-full  gap-5 ">
      <div className="h-fit w-full ">
        {/* Recenlty Added setion */}
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Scheduled Exams
          </h4>

          <button
            className="p-2 bg-blueSecondary text-white rounded-md shadow-md text-center"
            onClick={getExams}
          >
            {loading ? (
              <ThreeDots
                visible={true}
                height="24"
                width="160"
                color="#F4F7FE"
                radius="2"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Check for new exams"
            )}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {exams.length === 0 ? (
            <h1 className="font-semibold pt-5">
              Currently No exams scheduled for your batch
            </h1>
          ) : (
            exams.map((exam, index) => {
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
                    status={"Starts on " + exam.examDate + " " + exam.examTime}
                    examCode={exam.examCode}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
