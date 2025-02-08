import React, { useRef, useState, useEffect } from "react";
import SelectField from "../../../components/SelectField/SelectField";
import InputField from "../../../components/InputField/InputField";
import Switch from "../../../components/Switch/Switch";
import {
  batchOptions,
  courseOptions,
  divisionOptions,
  yearOptions,
} from "../../../constants/Options";
import Upload from "../../../components/Upload/Upload";
import axios from "axios";
import { toast } from "react-hot-toast";

const CreateExam = () => {
  const formRef = useRef();
  const [examCode, setExamCode] = useState("");
  const [problemsCount, setProblemsCount] = useState(0);
  const [problemStatements, setProblemStatements] = useState([]);
  const [enableVideoProctoring, setEnableVideoProctoring] = useState(false);
  const [enableAudioProctoring, setEnableAudioProctoring] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("A");
  const [availableBatches, setAvailableBatches] = useState([]);

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    if (name === "enableVideoProctoring") {
      setEnableVideoProctoring(checked);
    } else if (name === "enableAudioProctoring") {
      setEnableAudioProctoring(checked);
    }
    // Add more conditions for other switches if needed
  };

  const generateExamCode = (e) => {
    e.preventDefault();
    const code = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit code
    setExamCode(code); // Convert to string and update state
  };

  const handleProblemsCountChange = (e) => {
    const count = parseInt(e.target.value);
    setProblemsCount(count);
    // Generate initial array of empty strings for problem statements
    const initialStatements = Array.from({ length: count }, () => "");
    setProblemStatements(initialStatements);
  };

  const handleProblemStatementChange = (index, value) => {
    const updatedStatements = [...problemStatements];
    updatedStatements[index] = value;
    setProblemStatements(updatedStatements);
  };

  const renderInputFields = () => {
    return (
      <>
        <label
          htmlFor="problemStatements"
          className="mb-2 ml-1.5 block text-sm font-medium text-gray-900 dark:text-gray-400"
        ></label>

        {problemStatements.map((statement, index) => {
          return (
            <div key={index} className="mb-3">
              <label
                htmlFor={`problemStatement${index}`}
                className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
              >
                {`Problem Statement ${index + 1}*`}
              </label>
              <textarea
                rows="3"
                id={`problemStatement${index}`}
                name={`problemStatement${index}`}
                value={statement}
                onChange={(e) =>
                  handleProblemStatementChange(index, e.target.value)
                }
                className="mt-2 flex w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                placeholder={`Problem Statement ${index + 1}`}
              />
            </div>
          );
        })}
      </>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(formRef.current);
    const formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    formData["problemStatements"] = problemStatements;
    // Include the state of switches in the form data
    formData["enableVideoProctoring"] = enableVideoProctoring;
    formData["enableAudioProctoring"] = enableAudioProctoring;

    console.log("Form submitted", formData);

    axios
      .post("http://localhost:3000/exam/create-exam", formData)
      .then((res) => {
        toast.success(res.data.message);

        // Clear all form fields
        setExamCode("");
        setProblemsCount(0);
        setProblemStatements([]);
        setEnableVideoProctoring(false);
        setEnableAudioProctoring(false);
        // Reset the form
        formRef.current.reset();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      axios.defaults.withCredentials = true;
      axios
        .post("http://localhost:3000/course/get-courses-by-faculty")
        .then((res) => {
          console.log(res.data);
          setCourses(res.data);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedDivision === "A") {
      setAvailableBatches([
        { value: "A1", label: "A1" },
        { value: "A2", label: "A2" },
        { value: "A3", label: "A3" },
        { value: "A4", label: "A4" },
      ]);
    } else if (selectedDivision === "B") {
      setAvailableBatches([
        { value: "B1", label: "B1" },
        { value: "B2", label: "B2" },
        { value: "B3", label: "B3" },
        { value: "B4", label: "B4" },
      ]);
    } else if (selectedDivision === "C") {
      setAvailableBatches([
        { value: "C1", label: "C1" },
        { value: "C2", label: "C2" },
        { value: "C3", label: "C3" },
        { value: "C4", label: "C4" },
      ]);
    } else if (selectedDivision === "D") {
      setAvailableBatches([
        { value: "D1", label: "D1" },
        { value: "D2", label: "D2" },
        { value: "D3", label: "D3" },
        { value: "D4", label: "D4" },
      ]);
    }
  }, [selectedDivision]);

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-1 2xl:grid-cols-1">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <div className="flex w-full flex-col  rounded-[20px] bg-white bg-cover px-[30px] py-[30px] dark:bg-navy-800 md:px-[64px] md:py-[56px] ">
          <div className="w-full space-y-5">
            <h4 className="text-black mb-[14px] max-w-full text-xl font-bold dark:text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
              Create Exam
            </h4>

            <form ref={formRef} onSubmit={handleSubmit}>
              <SelectField
                label="Select course*"
                id="course"
                name="course"
                options={
                  courses.length > 0
                    ? courses.map((course) => {
                        return {
                          value: course.courseName,
                          label: course.courseName,
                        };
                      })
                    : courseOptions
                }
                extra="mb-3"
              />

              <div className="grid grid-cols-5 gap-10 w-full ">
                <div className="flex relative col-span-2">
                  <InputField
                    label="Exam Code*"
                    id="examCode"
                    name="examCode"
                    placeholder="6 digit secret exam code"
                    type="text"
                    extra="mb-3 w-full"
                    value={examCode || ""}
                    onChange={(e) => setExamCode(e.target.value)}
                  />
                  <button
                    onClick={(e) => generateExamCode(e)}
                    className="absolute mt-[38px] right-7 px-5 bg-brand-500 text-white text-sm p-2 rounded-md transition duration-200 hover:!bg-brand-500/80 active:!bg-brand-500/70 dark:bg-brand-400
                  "
                  >
                    Generate
                  </button>
                </div>

                <InputField
                  label="Select Date*"
                  id="examDate"
                  name="examDate"
                  type="date"
                  extra="mb-3"
                />
                <InputField
                  label="Start Time*"
                  id="examTime"
                  name="examTime"
                  type="time"
                  extra="mb-3"
                />

                <InputField
                  label="Exam Duration*"
                  placeholder="In Hours"
                  minValue="1"
                  id="examDuration"
                  name="examDuration"
                  type="number"
                  extra="mb-3"
                />
              </div>

              <div className="grid grid-cols-3 gap-5">
                <SelectField
                  label="Select Year*"
                  id="year"
                  name="year"
                  options={yearOptions}
                  extra="mb-3"
                />

                <SelectField
                  label="Select Division*"
                  id="division"
                  name="division"
                  options={divisionOptions}
                  extra="mb-3"
                  onChange={(e) => setSelectedDivision(e.target.value)}
                />

                <SelectField
                  label="Select Batch*"
                  id="batch"
                  name="batch"
                  options={availableBatches}
                  extra="mb-3"
                />
              </div>

              <div className="flex w-full items-center justify-center gap-4">
                <div className="w-full">
                  <label
                    htmlFor="problemsCount"
                    className={`mt-5 ml-1.5 text-sm font-medium text-navy-700 dark:text-white`}
                  >
                    Total Problem Statements*
                  </label>

                  <input
                    type="number"
                    id="problemsCount"
                    name="problemsCount"
                    min={0}
                    placeholder="Total Problem Statements"
                    className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none dark:text-white`}
                    value={problemsCount}
                    onChange={handleProblemsCountChange}
                  />

                  {/* Render InputFields based on problemsCount */}
                  {renderInputFields()}
                </div>

                <div className="rounded-full bg-gray-400 p-3 font-bold">
                  <p>OR</p>
                </div>

                <div>
                  <label
                    htmlFor="statementFile"
                    className="mb-2 ml-1.5 block pt-5 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Upload File*
                  </label>

                  <Upload />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-5">
                <Switch
                  label="Enable Video Proctoring"
                  id="enableVideoProctoring"
                  name="enableVideoProctoring"
                  extra="flex justify-center items-center space-x-2"
                  checked={enableVideoProctoring}
                  onChange={handleSwitchChange}
                />

                <Switch
                  label="Enable Audio Proctoring"
                  id="enableAudioProctoring"
                  name="enableAudioProctoring"
                  extra="flex justify-center items-center space-x-2"
                  checked={enableAudioProctoring}
                  onChange={handleSwitchChange}
                />
              </div>

              <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
                <button
                  className="linear rounded-xl bg-brand-500 px-4 py-2 text-center text-base font-medium text-white transition duration-200 hover:!bg-brand-500/80 active:!bg-brand-500/70 dark:bg-brand-400"
                  type="submit"
                >
                  Create Exam
                </button>
                <button
                  href=" "
                  className="text-black rounded-xl px-4 py-2 text-base font-medium hover:ring dark:text-white 2xl:ml-2"
                >
                  Save Draft
                </button>
              </div>

              {/* <div className="grid grid-cols-2 gap-10 relative">
                <div className="flex w-full justify-start items-start relative">
                  <div className="mb-3">
                    <label
                      htmlFor="examCode"
                      className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                    >
                      6 digit exam code*
                    </label>
                    <input
                      type="text"
                      id="examCode"
                      name="examCode"
                      placeholder="Enter exam code"
                      value={formData.examCode}
                      onChange={handleFieldChange}
                      className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-10">
                <div>
                  <label
                    htmlFor="year"
                    className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                  >
                    Select Year*
                  </label>
                  <select
                    name="year"
                    id="year"
                    value={formData.year}
                    onChange={handleFieldChange}
                    className="my-2 block h-12 w-full rounded-xl border border-gray-300 bg-white/0 p-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:!bg-white/5 dark:text-white dark:placeholder-gray-400 dark:placeholder:!text-[rgba(255,255,255,0.15)] dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="division"
                    className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                  >
                    Select Division*
                  </label>
                  <select
                    name="division"
                    id="division"
                    value={formData.division}
                    onChange={handleFieldChange}
                    className="my-2 block h-12 w-full rounded-xl border border-gray-300 bg-white/0 p-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:!bg-white/5 dark:text-white dark:placeholder-gray-400 dark:placeholder:!text-[rgba(255,255,255,0.15)] dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="batch"
                    className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                  >
                    Select Batch*
                  </label>
                  <select
                    name="batch"
                    id="batch"
                    value={formData.batch}
                    onChange={handleFieldChange}
                    className="my-2 block h-12 w-full rounded-xl border border-gray-300 bg-white/0 p-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:!bg-white/5 dark:text-white dark:placeholder-gray-400 dark:placeholder:!text-[rgba(255,255,255,0.15)] dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="A3">A3</option>
                    <option value="A4">A4</option>
                  </select>
                </div>
              </div>

              <div className="flex w-full items-center justify-center gap-4">
                <div className="w-full">
                  <label
                    htmlFor="problemsCount"
                    className={`mt-5 ml-1.5 text-sm font-medium text-navy-700 dark:text-white`}
                  >
                    Total Problem Statements*
                  </label>

                  <input
                    type="number"
                    id="problemsCount"
                    name="problemsCount"
                    min={0}
                    placeholder="Total Problem Statements"
                    className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none dark:text-white`}
                    value={problemsCount}
                    onChange={handleProblemsCountChange}
                  />

                  {/* Render InputFields based on problemsCount */}
              {/* {renderInputFields()}
                </div>

                <div className="rounded-full bg-gray-400 p-3 font-bold">
                  <p>OR</p>
                </div>

                <div>
                  <label
                    htmlFor="statementFile"
                    className="mb-2 ml-1.5 block pt-5 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Upload File*
                  </label>

                  <Upload />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-5">
                <div className="flex justify-center items-center space-x-2">
                  <Switch id="switch8" />
                  <label
                    htmlFor="checkbox8"
                    className="text-base font-medium text-navy-700 dark:text-white"
                  >
                    Enable Video Proctoring
                  </label>
                </div>

                <div className="flex justify-center items-center space-x-2">
                  <Switch id="switch8" />
                  <label
                    htmlFor="checkbox8"
                    className="text-base font-medium text-navy-700 dark:text-white"
                  >
                    Enable Audio Proctoring
                  </label>
                </div>
              </div>

              
              */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
