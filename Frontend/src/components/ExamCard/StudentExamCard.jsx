import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";

const StudentExamCard = ({
  key,
  courseName,
  examCode,
  examDate,
  examTime,
  year,
  examDuration,
  division,
  batch,
  status,
  extra,
}) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/exam-instructions`, { state: { courseName, examCode } });
  };

  let date = new Date(examDate);
  date = date.toLocaleDateString("hi-IN");

  return (
    <Card
      extra={`flex h-[290px] flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
      key={key}
    >
      <div className="h-full w-full">
        <div className="relative w-full space-y-3">
          <div>
            <p className="text-lg font-bold text-navy-500 dark:text-white">
              Course Name:
            </p>
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {courseName}
            </p>
          </div>

          <p className="text-md mt-1 font-medium text-gray-700 md:mt-2">
            <span className="text-navy-700 dark:text-navy-50">Exam Date:</span>{" "}
            {date + " " + examTime}
          </p>
          <p className="text-md mt-1 font-medium text-gray-700 md:mt-2">
            <span className="text-navy-700 dark:text-navy-50">
              Exam Duration:
            </span>{" "}
            {examDuration} hours
          </p>
          <p className="text-md mt-1 font-medium text-gray-700 md:mt-2">
            <span className="text-navy-700 dark:text-navy-50">Year:</span>{" "}
            {year}
          </p>
          <p className="text-md mt-1 font-medium text-gray-700 md:mt-2">
            <span className="text-navy-700 dark:text-navy-50">Division:</span>{" "}
            {division}
            <span className="text-navy-700 dark:text-navy-50 ml-5">
              Batch:
            </span>{" "}
            {batch}
          </p>

          <div className="flex justify-start items-center space-x-5">
            <button
              onClick={handleOnClick}
              disabled={status === "completed"}
              href=""
              className={`linear rounded-[20px]  px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90 ${
                status === "completed" ? " bg-red-500" : " bg-brand-900"
              }`}
            >
              {status === "completed" ? "Completed" : "Start Exam"}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StudentExamCard;
