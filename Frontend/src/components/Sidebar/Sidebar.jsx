import React from "react";
import { HiX } from "react-icons/hi";
import Links from "./components/Links";

const adminRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    layout: "/admin",
    icon: "dashboard",
  },
  {
    name: "Courses",
    path: "courses",
    layout: "/admin",
    icon: "course",
  },
  {
    name: "Add new Course",
    path: "add-course",
    layout: "/admin",
    icon: "create",
  },
  {
    name: "Create Exam",
    path: "create-exam",
    layout: "/admin",
    icon: "course",
  },
  {
    name: "Previous Exams",
    path: "previous-exams",
    layout: "/admin",
    icon: "course",
  },
  {
    name: "Profile",
    path: "profile",
    layout: "/admin",
    icon: "course",
  },
];

const studentRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    layout: "/student",
    icon: "dashboard",
  },
  {
    name: "Completed Exams",
    path: "completed-exams",
    layout: "/student",
    icon: "course",
  },
  {
    name: "Profile",
    path: "profile",
    layout: "/student",
    icon: "course",
  },
];

const Sidebar = ({ open, onClose, layout }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Dashboard
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        {layout === "student" ? (
          <Links routes={studentRoutes} />
        ) : (
          <Links routes={adminRoutes} />
        )}
      </ul>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
