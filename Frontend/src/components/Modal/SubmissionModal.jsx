import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setCode } from "../../features/code-editor/codeEditorSlice";
import axios from "axios";

export default function SubmissionModal({ open, onClose, children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.authData.user.student);
  const examId = useSelector((state) => state.currentExamData.examId);
  const code = useSelector((state) => state.codeEditorData.code);

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
        <div className="bg-white rounded-xl shadow p-6 relative w-[1400px] h-full">
          <button onClick={onClose} className="absolute top-2 right-2">
            <IoIosCloseCircle size={24} />
          </button>
          <div className="text-center w-full h-52 z-50 flex justify-center items-center flex-col gap-5">
            {children}

            <button
              className="text-white bg-red-500 p-3 rounded-lg  flex justify-center items-center gap-2"
              // onClick={ }
              onClick={onClose}
            >
              {<IoWarning />} Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
