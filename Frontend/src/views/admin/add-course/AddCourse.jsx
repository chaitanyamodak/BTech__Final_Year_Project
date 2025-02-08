import React, { useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import InputField from "../../../components/InputField/InputField";

const AddCourse = () => {
  const formRef = useRef();

  const handleAddCourseSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    const { courseName, courseCode, maximumMarks } = formData;

    axios
      .post("http://localhost:3000/course/add-course", {
        courseName,
        courseCode,
        maximumMarks,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Course added successfully");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-1 2xl:grid-cols-1">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <div className="flex w-full flex-col rounded-[20px] bg-white bg-cover px-[30px] py-[30px] dark:bg-navy-800 md:px-[64px] md:py-[56px] ">
          <div className="w-full">
            <h4 className="text-black mb-[14px] max-w-full text-xl font-bold dark:text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
              Add Course
            </h4>

            <form ref={formRef} onSubmit={handleAddCourseSubmit}>
              <InputField
                label="Course Name*"
                id="courseName"
                name="courseName"
                placeholder="Enter Course Name"
                variant="auth"
                type="text"
                extra="mb-3"
              />
              <InputField
                label="Course Code*"
                id="courseCode"
                name="courseCode"
                placeholder="Enter Course Code"
                variant="auth"
                type="text"
                extra="mb-3"
              />
              <InputField
                label="Maximum Marks*"
                id="maximumMarks"
                name="maximumMarks"
                placeholder="Enter Maximum Marks"
                variant="auth"
                type="number"
                extra="mb-3"
              />

              <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
                <button className="linear rounded-xl bg-brand-500 px-4 py-2 text-center text-base font-medium text-white transition duration-200 hover:!bg-brand-500/80 active:!bg-brand-500/70 dark:bg-brand-400">
                  Add Course
                </button>
                <button
                  href=" "
                  className="text-black rounded-xl px-4 py-2 text-base font-medium hover:ring dark:text-white 2xl:ml-2"
                >
                  Save Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
