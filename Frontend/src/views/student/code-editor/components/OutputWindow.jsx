import React, { useState, useEffect, useContext } from "react";
import { executeCode } from "./api.js";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCodeOutput } from "../../../../features/result/resultSlice.js";

const OutputWindow = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [codeResult, setCodeResult] = useState({});
  const { examCode } = useParams();
  const codeOutput = useSelector((state) => state.resultData.codeOutput);

  const sourceCode = useSelector((state) => state.codeEditorData.code);
  const language = useSelector((state) => state.codeEditorData.language);

  const runCode = async () => {
    console.log(sourceCode, language);
    if (!sourceCode) {
      return;
    }

    try {
      setLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output);
      setCodeResult(result);
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      toast.error("An error occurred while running the code");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setCodeOutput(output));
    console.log(codeOutput);
    console.log(output);
  }, [output]);

  return (
    <>
      <div className="relative flex flex-col justify-center items-center space-y-2">
        {/* <h1 className="my-20">THIS IS EDITOR</h1> */}
        <button
          className={`absolute text-white top-0 text-slate-100 p-3 rounded-md hover:shadow-lg ${
            loading ? " disabled bg-gray-800" : " bg-gray-900"
          }`}
          onClick={runCode}
        >
          {loading ? "Processing..." : "Run Code"}
        </button>

        <div
          className={` overflow-auto h-auto w-full border-2 p-2 ${
            isError ? " border-red-500 " : " border-slate-900 "
          }`}
        >
          <pre>{output ? output : 'Click "Run Code" to see output here'}</pre>
        </div>
      </div>
    </>
  );
};

export default OutputWindow;
