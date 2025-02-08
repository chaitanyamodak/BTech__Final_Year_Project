import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { storeInSession } from "../../common/session";

export default function StudentSignUp() {
  const navigate = useNavigate();
  //   let {
  //     userAuth: { access_token },
  //     setUserAuth,
  //   } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    const { email, prn, name, year, division, batch, password } =
      e.target.elements;
    axios
      .post("http://localhost:3000/auth/student/signup", {
        email: email.value,
        prn: prn.value,
        name: name.value,
        year: year.value,
        division: division.value,
        batch: batch.value,
        password: password.value,
      })
      .then(({ data }) => {
        console.log(data);
        toast.success("Student registered successfully");
        // storeInSession("user", JSON.stringify(data));
        // setUserAuth(data);
        navigate("/signin", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  }
  //   return access_token ? (
  //     <Navigate to="/student" />
  //   ) : (
  return (
    <div className="flex h-screen w-full items-center justify-center px-2 md:mx-0 md:px-0 ">
      {/* Sign in section */}
      <div className="w-full flex-col items-center p-10 rounded-md border shadow-lg xl:max-w-[700px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Student Registration
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
                  type="text"
                  id="email"
                  required
                  placeholder="mail@simmmple.com"
                  className="mt-2 flex h-12 focus:ring-1 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                />
              </div>

              <div className="mt-3">
                <label
                  htmlFor="prn"
                  className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                >
                  PRN*
                </label>
                <input
                  type="text"
                  id="prn"
                  placeholder="Enter PRN"
                  className="mt-2 flex h-12 focus:ring-1 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                  required
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
                  placeholder="Enter name"
                  className="mt-2 flex h-12 focus:ring-1 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                  required
                />
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
                    placeholder="Enter Password"
                    className="mt-2 flex h-12 focus:ring-1 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="mt-10">
                <label
                  htmlFor="year"
                  className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                >
                  Year*
                </label>
                <input
                  type="text"
                  id="year"
                  placeholder="Enter Year"
                  className="mt-2 flex h-12 w-full focus:ring-1 items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                  required
                />
              </div>

              <div className="mt-3">
                <label
                  htmlFor="division"
                  className="text-sm text-navy-700  dark:text-white ml-1.5 font-medium"
                >
                  Division*
                </label>
                <input
                  type="text"
                  id="division"
                  placeholder="Enter Year"
                  className="mt-2 flex h-12 focus:ring-1 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                  required
                />
              </div>
              <div className="mt-3">
                <label
                  htmlFor="batch"
                  className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                >
                  Batch*
                </label>
                <input
                  type="text"
                  id="batch"
                  placeholder="Enter Year"
                  className="mt-2 flex h-12 w-full focus:ring-1 items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                  required
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
