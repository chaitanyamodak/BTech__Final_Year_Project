import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IoWarning } from "react-icons/io5";

export default function Modal({ activity, open, onClose, children }) {
  return (
    <div>
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-80 z-50 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed inset-0 flex justify-center items-center z-50 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-xl shadow p-6 relative">
          <button onClick={onClose} className="absolute top-2 right-2">
            <IoIosCloseCircle size={24} />
          </button>
          <div className="text-center w-full h-52 z-50 flex justify-center items-center flex-col gap-5">
            <div className="mx-auto my-4 w-full">
              <h3 className="text-lg font-black text-gray-800">
                {activity === "tabChangeCount"
                  ? "Tab Change Activity"
                  : activity === "paste"
                  ? "Copy Paste Activity"
                  : activity === "endExam"
                  ? "End Exam"
                  : activity === "copypaste"
                  ? "Copy Paste Activity"
                  : "Fullscreen Activity"}
              </h3>
              <p className="text-md text-gray-700 font-semibold">
                {activity === "tabChangeCount"
                  ? "Tab Change activity has been notified to faculty"
                  : activity === "paste"
                  ? "Copy paste activity has been notified to faculty"
                  : activity === "endExam"
                  ? "Are you sure to end exam ?"
                  : activity === "copypaste"
                  ? "Copy paste activity has been notified to faculty"
                  : "You have entered fullscreen"}
              </p>
              <p className="text-md text-gray-700 font-semibold">
                {activity === "tabChangeCount"
                  ? "After 3 warnings your exam will be terminated"
                  : activity === "paste"
                  ? "On Next copy paste your exam will be terminated"
                  : activity === "endExam"
                  ? "Your code and output will be shared with faculty"
                  : activity === "copypaste"
                  ? "On Next copy paste your exam will be terminated"
                  : "You have entered fullscreen"}
              </p>
            </div>

            <button
              className="text-white bg-red-500 p-3 rounded-lg w-full flex justify-center items-center gap-2"
              onClick={onClose}
              //  onClick={handleClick}
            >
              {<IoWarning />}{" "}
              {activity === "endExam" ? "End Exam" : "Close Warning"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
