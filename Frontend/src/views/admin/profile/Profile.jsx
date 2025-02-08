import React, { useState, useEffect } from "react";
import Card from "../../../components/Card/Card";
import axios from "axios";
import banner from "../../../assets/img/profile/banner.png";
import avatar from "../../../assets/img/avatars/avatar4.png";

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios
      .get("http://localhost:3000/faculty/get-profile")
      .then((res) => {
        console.log(res.data.faculty);
        setProfile(res.data.faculty);
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
                {profile.name}
              </h4>
              <p className="text-base font-normal text-gray-600">
                {profile.email}
              </p>
            </div>

            {/* Post followers */}
            <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-navy-700 dark:text-white">
                  {profile.courses?.length}
                </p>
                <p className="text-sm font-normal text-gray-600">Courses</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-navy-700 dark:text-white">
                  {profile.exams?.length}
                </p>
                <p className="text-sm font-normal text-gray-600">Exams</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* <div className="grid h-full grid-cols-1 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          <Notification />
        </div>
      </div> */}
    </div>
  );
};

export default Profile;
