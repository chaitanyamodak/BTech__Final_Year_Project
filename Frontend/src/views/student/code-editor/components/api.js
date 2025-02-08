import axios from "axios";
import { LANGUAGE_VERSIONS } from "../constants/Languages";
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode) => {
  try {
    const response = await API.post("/execute", {
      language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
