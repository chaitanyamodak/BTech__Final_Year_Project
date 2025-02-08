import { useState } from "react";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  BrowserRouter,
  createRoutesFromElements,
  Routes,
} from "react-router-dom";
import AuthLayout from "./layouts/auth";
import AdminLayout from "./layouts/admin";
import RootLayout from "./layouts/rootLayout";
import SignIn from "./pages/auth/Signin";
import StudentSignUp from "./pages/auth/StudentSignUp";
import FacultySignUp from "./pages/auth/FacultySignUp";
import FacultySignIn from "./pages/auth/FacultySignIn";
import ExamDashboard from "./views/admin/dashboard/Dashboard";
import AddCourse from "./views/admin/add-course/AddCourse";
import CreateExam from "./views/admin/create-exam/CreateExam";
import UserContextProvider from "./contexts/UserContextProvider";
import Courses from "./views/admin/courses/Courses";
import MonitorExam from "./views/admin/monitor-exam/MonitorExam";
import CompletedExams from "./views/admin/completed-exams/CompletedExams";
import Profile from "./views/admin/profile/Profile";
import Home from "./views/student/home/Home";
import StudentLayout from "./layouts/student";
import StudentProfile from "./views/student/profile/Profile";
import StudentCompletedExams from "./views/student/completed-exams/CompletedExams";
import ExamInstructions from "./views/student/exam-instructions/ExamInstructions";
import CodeEditor from "./views/student/code-editor/CodeEditor";
import Questions from "./views/student/questions/Questions";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//       <Route path="/" element={<AuthLayout />}>
//         <Route path="/" element={<SignIn />} />
//         <Route path="/signup" element={<StudentSignUp />} />
//         <Route path="/admin/login" element={<FacultySignIn />} />
//         <Route path="/admin" element={<AdminLayout />}>
//           <Route path="/admin/dashboard" element={<ExamDashboard />} />
//           <Route path="/admin/add-course" element={<AddCourse />} />
//           <Route path="/admin/create-exam" element={<CreateExam />} />
//         </Route>
//         <Route path="/student/signup" element={<StudentSignUp />} />
//         <Route path="/admin/signup" element={<FacultySignUp />} />
//       </Route>

//       <Route path="/admin" element={<AuthLayout />}></Route>

//       <Route path="/student" element={<AdminLayout />} />
//     </Route>
//   )
// );

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <StudentSignUp />,
  },
  {
    path: "/write-answers",
    element: <Questions />,
  },
  {
    path: "/admin",
    element: <FacultySignIn />,
  },
  {
    path: "/admin/signup",
    element: <FacultySignUp />,
  },
  {
    path: "/exam/:examcode",
    element: <CodeEditor />,
  },
  {
    path: "/",
    element: <StudentLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <StudentProfile />,
      },
      {
        path: "/completed-exams",
        element: <StudentCompletedExams />,
      },
      {
        path: "/exam-instructions",
        element: <ExamInstructions />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <ExamDashboard />,
      },
      {
        path: "/admin/courses",
        element: <Courses />,
      },
      {
        path: "/admin/add-course",
        element: <AddCourse />,
      },
      {
        path: "/admin/create-exam",
        element: <CreateExam />,
      },
      {
        path: "/admin/dashboard/exam/:examcode",
        element: <MonitorExam />,
      },
      {
        path: "/admin/previous-exams",
        element: <CompletedExams />,
      },
      {
        path: "/admin/profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
  // <UserContextProvider>
  {
    /* <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<StudentSignUp />} />
        <Route path="/admin" element={<FacultySignIn />} />
        <Route path="/admin/signup" element={<FacultySignUp />} />
        <Route path="/exam/:examcode" element={<CodeEditor />} />


        <Route path="/" element={<StudentLayout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/completed-exams" element={<StudentCompletedExams />} />
          <Route path="/exam-instructions" element={<ExamInstructions />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<ExamDashboard />} />
          <Route path="/admin/courses" element={<Courses />} />
          <Route path="/admin/add-course" element={<AddCourse />} />
          <Route path="/admin/create-exam" element={<CreateExam />} />
          <Route
            path="/admin/dashboard/exam/:examcode"
            element={<MonitorExam />}
          />
          <Route path="/admin/previous-exams" element={<CompletedExams />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>
      </Routes> */
  }

  //   </UserContextProvider>
}

export default App;
