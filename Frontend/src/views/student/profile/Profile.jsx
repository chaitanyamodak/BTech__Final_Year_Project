import React, { useState, useEffect } from "react";
import Card from "../../../components/Card/Card";
import axios from "axios";
import banner from "../../../assets/img/profile/banner.png";
import avatar from "../../../assets/img/avatars/avatar4.png";
import { useSelector } from "react-redux";

const Profile = () => {
  const [student, setStudent] = useState({});
  const date = new Date(student.createdAt);
  const joinedDate = date.toLocaleDateString("hi-IN");

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/student/get-student-profile")
      .then(({ data }) => {
        console.log(data);
        setStudent(data.student);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="w-ful mt-3 flex h-fit gap-5">
        <div className="lg:!mb-0">
          <Card extra={"items-center w-[350px] h-full p-[16px] bg-cover"}>
            {/* Background and profile */}
            <div
              className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
              style={{ backgroundImage: `url(${banner})` }}
            >
              <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                <img
                  className="h-full w-full rounded-full"
                  src={avatar}
                  alt=""
                />
              </div>
            </div>

            {/* Name and position */}
            <div className="mt-16 flex flex-col items-center">
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                {student.name}
              </h4>
              <p className="text-base font-normal text-gray-600">
                {student.email}
              </p>
            </div>

            {/* Post followers */}
            <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-navy-700 dark:text-white">
                  2
                </p>
                <p className="text-sm font-normal text-gray-600">Courses</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-navy-700 dark:text-white">
                  4
                </p>
                <p className="text-sm font-normal text-gray-600">Exams</p>
              </div>
            </div>
          </Card>
        </div>

        <Card extra={"w-full h-full p-3"}>
          {/* Header */}
          <div className="mt-2 mb-8 w-full">
            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
              Student Profile
            </h4>
          </div>
          {/* Cards */}
          <div className="grid grid-cols-2 gap-4 px-2">
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">PRN</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {student.prn}
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {student.email}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Academic Year</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {student.year}
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Division</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {student.division}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Batch</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {student.batch}
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Joined On</p>
              <p className="text-base font-medium text-navy-700 dark:text-white">
                {joinedDate}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
