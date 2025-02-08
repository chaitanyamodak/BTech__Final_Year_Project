import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const navigate = useNavigate();
  const [end, setEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(5).fill(""));
  const monitoringData = useSelector((state) => state.monitoringData.monitor);
  const examId = useSelector((state) => state.currentExamData.examId);
  const studentId = useSelector((state) => state.authData.user.student._id);
  const [topic, setTopic] = useState("");

  //const [apiResponse, setApiResponse] = useState("");
  const genAI = new GoogleGenerativeAI(
    "AIzaSyB_ZmRlub2KvYwk73wAx-c-N57Iv1cNM24"
  );

  const [chatbotFeedback, setChatbotFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const generateQuestions = async () => {
    setLoading(true);
    setSubmitted(false);
    setQuestions([]);
    setAnswers(Array(5).fill(""));
    setSubmitted(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate 5 short answer questions based on the topic: ${topic}`;
    console.log(topic);

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const questions = response.text().split("\n").filter(Boolean);
      setQuestions(questions);
    } catch (error) {
      console.error("Error generating questions:", error);
    }

    setLoading(false);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const model1 = genAI.getGenerativeModel({ model: "gemini-pro" });
    // Combine questions and answers into a single prompt for Gemini chatbot
    const combinedPrompt = questions
      .map((question, index) => `${question}\nAnswer: ${answers[index]}`)
      .join("\n\n");
    // setCombinedPrompt(combinedPrompt);
    // Additional prompt for Gemini chatbot
    const promptForGemini = `Evaluate the following questions and answers and calculate score give score accordingly to answer the out of 10 for each question and at the last give total score and give feeback in this pattern Question , Student answer , Correct answer, Evaulation, Score in short:\n\n${combinedPrompt}`;

    // const topic = "writing a program for Dijkstra's algorithm";
    // const prompt = `Generate 5 short answer questions based on the topic: ${topic}`;

    try {
      const result = await model1.generateContent(promptForGemini);
      const response = await result.response;

      const feedbackText =
        response?.text || "No feedback received from chatbot.";
      setChatbotFeedback(feedbackText);
      console.log(feedbackText);
      setEnd(true);
    } catch (error) {
      setChatbotFeedback("Error evaluating answers. Please try again.");
    }

    setLoading(false);
  };
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/exam/get-monitoring-data/${examId}/${studentId}`
      )
      .then(({ data }) => {
        console.log(data);
        setTopic(data.problemStatement);
        console.log(data);
        console.log(topic);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <div className="max-w-[800px] m-auto p-[20px]">
        <h1>Applied Coding Skills Evaluation</h1>
        <div className="mb-[30px]">
          <button
            className="bg-blueSecondary rounded-md mt-2 text-[#fff] border-none p-[10px] cursor-pointer"
            onClick={generateQuestions}
            disabled={loading || submitted}
          >
            {loading ? "Generating Questions..." : "Generate Questions"}
          </button>
        </div>
        {loading && <p>It will take 4-5 seconds to generate...</p>}
        {questions.length > 0 && (
          <div className="content">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <div className="flex flex-col">
                {questions.map((question, index) => (
                  <div key={index} className="mb-[20px] text-justify">
                    <div className="question-text">
                      <strong>{question}</strong>
                    </div>
                    <textarea
                      className="w-full p-[10px] rounded-md border-2 mt-5"
                      rows="3"
                      required
                      value={answers[index]}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[index] = e.target.value;
                        setAnswers(newAnswers);
                      }}
                    ></textarea>
                    {index < questions.length - 1}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="bg-blueSecondary text-white border-none p-3 rounded-md font-md cursor-pointer"
                disabled={loading}
              >
                {loading ? "Submitting Answers..." : "Submit Answers"}
              </button>
            </form>
            {loading && <p>Evaulting Your Answers Plese wait for a while...</p>}
          </div>
        )}
        {chatbotFeedback && (
          <div className="mt-[30px]">
            <h2 className="mb-[10px]">Feedback</h2>
            <div className="p-[20px] bottom-1 bg-[#f5f8fe]">
              {chatbotFeedback.split("\n").map((line, index) => (
                <p key={index} className="my-3">
                  {line}
                </p>
              ))}
              {console.log(chatbotFeedback)}
            </div>
          </div>
        )}

        <div>
          {end && (
            <button
              className="bg-blueSecondary text-white border-none p-3 rounded-md font-md cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Go to dashboard
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Questions;
