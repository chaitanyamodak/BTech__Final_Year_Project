import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { storeInSession } from "../../common/session";
import UserContext from "../../contexts/UserContext";

export default function FacultySignUp() {
  // let {
  //   userAuth: { access_token },
  //   setUserAuth,
  // } = useContext(UserContext);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const { email, name, password } = e.target.elements;

    if (!email.value || !name.value || !password.value) {
      return toast.error("All fields are required");
    }

    axios
      .post("http://localhost:3000/auth/faculty/signup", {
        email: email.value,
        name: name.value,
        password: password.value,
      })
      .then(({ data }) => {
        console.log(data);
        toast.success("Faculty registered successfully");
        storeInSession("user", JSON.stringify(data));
        navigate("/admin");
        // setUserAuth(data);
      })
      .catch(({ response }) => {
        console.log(response);
        toast.error(response.data.message);
      });
  }
  //   return access_token ? (
  //     <Navigate to="/student" />
  //   ) : (
  return (
    <div className="flex h-screen w-full items-center justify-center px-2 md:mx-0 md:px-0 ">
      {/* Sign in section */}
      <div className="w-full flex-col items-center  xl:max-w-[500px] px-10 py-10 rounded-md shadow-lg">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Faculty Registration
        </h4>

        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          <div className="flex justify-center items-start w-full gap-5">
            <div className="w-full">
              <div className="mt-10">
                <label
                  htmlFor="email"
                  className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="name@email.com"
                  className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                />
              </div>

              <div className="mt-3">
                <label
                  htmlFor="name"
                  className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                >
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Enter name"
                  className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                />
              </div>
              <div className="mt-3">
                <label
                  htmlFor="password"
                  className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                >
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="Enter Password"
                  className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                />
              </div>
            </div>
          </div>

          <button className="linear mt-5 w-52 rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Create a new account
          </button>
        </form>
      </div>
    </div>
  );
}
