import React, { useEffect, useState, useCallback } from "react";
import OutputWindow from "./components/OutputWindow";
import Problem from "./components/Problem";
import EditorWindow from "./components/EditorWindow";
import SplitterLayout from "react-splitter-layout-react-v18";
import "react-splitter-layout-react-v18/lib/index.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Modal from "../../../components/Modal/Modal";
import { setMonitoringData } from "../../../features/monitoring-data/monitorDataSlice";
import ReactRouterPrompt from "react-router-prompt";
import EndExamModal from "../../../components/Modal/EndExam";
import { setCode } from "../../../features/result/resultSlice";
import { useNavigate } from "react-router-dom";

const CodeEditor = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activity, setActivity] = useState("");
  const examId = useSelector((state) => state.currentExamData.examId);
  const studentId = useSelector((state) => state.authData.user.student._id);
  const [problemStatement, setProblemStatement] = useState("");
  const [tabChanges, setTabChanges] = useState(0);
  const code = useSelector((state) => state.codeEditorData.code);
  const resultOutput = useSelector((state) => state.resultData.codeOutput);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/exam/get-monitoring-data/${examId}/${studentId}`
      )
      .then(({ data }) => {
        console.log(data);
        setProblemStatement(data.problemStatement);
        dispatch(setMonitoringData(data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const handleTabChange = () => {
      if (document.hidden) {
        setActivity("tabChangeCount");
        setOpen(true);
        axios
          .post(
            `http://localhost:3000/monitor/update-count/${examId}/${studentId}`,
            {
              activity: "tabChangeCount",
            }
          )
          .then(({ data }) => {
            dispatch(setMonitoringData(data.studentData));
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    document.addEventListener("visibilitychange", handleTabChange);

    return () => {
      document.removeEventListener("visibilitychange", handleTabChange);
    };
  }, [tabChanges]);

  // useEffect(() => {
  //   // axios
  //   //   .get(
  //   //     "http://localhost:3000/exam/get-monitoring-data/591882/66014e8c1bd97b754386d08c"
  //   //   )
  //   //   .then(({ data }) => {
  //   //     console.log(data);
  //   //     setProblemStatement(data);
  //   //     dispatch(setMonitoringData(data));
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error(error);
  //   //   });

  //   setExamId("591882");
  //   setStudentId("66014e8c1bd97b754386d08c");

  //   const handleTabChange = () => {
  //     setActivity("tabChangeCount");
  //     setOpen(true);
  //   };

  //   document.addEventListener("visibilitychange", handleTabChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleTabChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (activity === "tabChangeCount" && examId && studentId) {
  //     axios
  //       .post(
  //         `http://localhost:3000/monitor/update-count/${examId}/${studentId}`,
  //         {
  //           activity: "tabChangeCount",
  //         }
  //       )
  //       .then(({ data }) => {
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [activity, examId, studentId]);

  // const toggleFullscreen = () => {
  //   const docElement = document.documentElement;
  //   if (!isFullscreen) {
  //     if (docElement.requestFullscreen) {
  //       docElement.requestFullscreen();
  //     } else if (docElement.webkitRequestFullscreen) {
  //       /* Safari */
  //       docElement.webkitRequestFullscreen();
  //     } else if (docElement.msRequestFullscreen) {
  //       /* IE11 */
  //       docElement.msRequestFullscreen();
  //     }
  //   }
  //   setIsFullscreen(true);
  // };

  return (
    <>
      <ReactRouterPrompt
        when={({ currentLocation, nextLocation }) =>
          currentLocation.pathname !== nextLocation.pathname
        }
        beforeConfirm={async () => {
          const examCode = examId;
          dispatch(setCode(code));

          axios
            .post(
              import.meta.env.VITE_SERVER_DOMAIN +
                `/monitor/exam-submission/${examCode}/${studentId}`,
              {
                resultCode: code,
                resultOutput,
              }
            )
            .then(({ data }) => {
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
            });

          axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/monitor/submit-exam", {
              examCode,
              studentId,
            })
            .then(({ data }) => {
              console.log(data);
              navigate("/write-answers", { replace: true });
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      >
        {({ isActive, onConfirm, onCancel }) => (
          <EndExamModal
            activity="goBack"
            open="true"
            onClose={() => setOpen(false)}
          >
            <div className="flex justify-center items-center w-full gap-5">
              <button
                className="text-white bg-green-600 p-3 rounded-lg w-full flex justify-center items-center gap-2"
                onClick={onCancel}
              >
                Back to exam
              </button>

              <button
                className="text-white bg-red-500 p-3 rounded-lg w-full flex justify-center items-center gap-2"
                // onClick={ }
                onClick={onConfirm}
              >
                {activity === "endExam" ? <IoWarning /> : ""}
                {activity === "endExam" ? "Confirm End Exam" : "End Exam"}
              </button>
            </div>
          </EndExamModal>
        )}
      </ReactRouterPrompt>
      <Modal
        activity={activity}
        open={open}
        onClose={() => setOpen(false)}
      ></Modal>

      <div id="main">
        <SplitterLayout primaryIndex={1} secondaryInitialSize={350}>
          <Problem />

          <SplitterLayout secondaryInitialSize={300}>
            <SplitterLayout vertical>
              <EditorWindow id="editor-container" />
              <OutputWindow />
            </SplitterLayout>
          </SplitterLayout>
        </SplitterLayout>
      </div>
    </>
  );
};

export default CodeEditor;
