import React, { useState, useContext, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector.jsx";
import { CODE_SNIPPETS } from "../constants/codeSnippets.js";
import { useSelector, useDispatch } from "react-redux";
import {
  setCode,
  setLanguage,
} from "../../../../features/code-editor/codeEditorSlice.js";
import Modal from "../../../../components/Modal/Modal.jsx";
import axios from "axios";
import { setMonitoringData } from "../../../../features/monitoring-data/monitorDataSlice.js";

const EditorWindow = () => {
  const [activity, setActivity] = useState("");
  const [open, setOpen] = useState(false);

  const editorRef = useRef(null);
  const dispatch = useDispatch();

  const examId = useSelector((state) => state.currentExamData.examId);
  const studentId = useSelector((state) => state.authData.user.student._id);

  const { language, code } = useSelector((state) => state.codeEditorData);
  console.log(language, code);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const onSelectChange = (sl) => {
    const selectedLanguage = sl.value;
    dispatch(setLanguage(selectedLanguage));
    dispatch(setCode(CODE_SNIPPETS[selectedLanguage]));
    console.log(code);
  };

  const options = {
    selectOnLineNumbers: true,
    mouseWheelZoom: true,
    fontSize: 18,
    contextmenu: false,
    formatOnType: true,
    smoothScrolling: true,
    wordWrap: "on",
  };

  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
    console.log("in on mount, ");

    editor.onKeyDown((event) => {
      const { keyCode, ctrlKey, metaKey } = event;
      if ((keyCode === 33 || keyCode === 52) && (metaKey || ctrlKey)) {
        event.preventDefault();
        setActivity("copypaste");
        setOpen(true);

        axios
          .post(
            `http://localhost:3000/monitor/update-count/${examId}/${studentId}`,
            {
              activity: "copyPasteCount",
            }
          )
          .then(({ data }) => {
            dispatch(setMonitoringData(data.studentData));
            console.log("Copy paste count increased");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });

  };

  return (
    <>
      <div>
        <Modal
          activity={activity}
          open={open}
          onClose={() => setOpen(false)}
        ></Modal>
        <LanguageSelector
          defLanguage={language}
          onSelectChange={onSelectChange}
        />

        <div
          className="overlay overflow-hidden w-full h-full shadow-4xl"
          // onKeyDown={handleKeyDown}
        >
          <Editor
            height="85vh"
            width="100vw"
            theme="vs-dark"
            language={language}
            options={options}
            defaultValue={CODE_SNIPPETS[language]}
            value={code}
            onChange={(value) => dispatch(setCode(value))}
            onMount={onMount}
          />
        </div>
      </div>
    </>
  );
};

export default EditorWindow;
