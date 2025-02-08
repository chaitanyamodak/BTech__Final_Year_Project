import React, { useContext, useRef } from "react";
import { toast } from "react-hot-toast";
import Checkbox from "../../components/Checkbox/Checkbox";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import UserContext from "../../contexts/UserContext";
import { storeInSession } from "../../common/session";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/auth/authSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // let {
  //   user,
  //   user: { accessToken },
  //   setUser,
  // } = useContext(UserContext);
  const formRef = useRef();

  const handleStudentLogin = (e) => {
    e.preventDefault();

    let form = new FormData(formRef.current);
    let formData = {};

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    const { email, password } = formData;

    if (!email.length) {
      return toast.error("Enter email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }

    if (!password.length) {
      return toast.error("Enter password");
    }

    console.log(formData);

    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3000/auth/student/login", {
        email,
        password,
      })
      .then(({ data }) => {
        navigate("/dashboard");
        // setUser(data);
        console.log(data);
        toast.success("Student logged in successfully");
        dispatch(setUser(data));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3000/auth/logout")
      .then(({ data }) => {
        toast.success("Logged out successfully");
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // return accessToken ? (
  //   navigate("/home")
  // ) : (
  return (
    <div className="mt-16 mb-10 flex h-full w-full justify-center items-center">
      {/* Sign in section */}
      <div className="mt-[10vh] w-fit flex-col items-center shadow-md border p-10">
        <h4 className="mb-2.5 text-3xl font-bold text-navy-700 dark:text-white">
          Student Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>

        <form ref={formRef} onSubmit={handleStudentLogin}>
          {/* Email */}

          <InputField
            extra="mb-3"
            label="Email"
            id="email"
            name="email"
            placeholder="Enter name*"
            variant="auth"
            type="text"
          />

          {/* Password */}

          <InputField
            extra="mb-3"
            label="Password"
            id="password"
            name="password"
            placeholder="Enter Password*"
            variant="auth"
            type="password"
          />

          <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign In
          </button>
        </form>

        <p className="text-center mt-5">
          Dont' have an account?{" "}
          <Link to="/signup" className="text-blueSecondary font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
