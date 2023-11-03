import axios from "axios";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import { BACKEND_URI } from "../../config/constants";


const QuizForm = () => {
  const [questionsDiv, setQuestionsDiv] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizSynopsis, setQuizSynopsis] = useState("");
  const courseId = useParams();
  const location = useLocation();

  const addQuestionHandler = (e) => {
    // let div = (
    //   <details className="m-4">
    //     <summary className="hover:cursor-pointer">
    //       <span> Question 1</span>
    //     </summary>
    //     <div className="border-b border-gray-900/10 pb-12">
    //       <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    //         <div className="sm:col-span-6">
    //           <label
    //             htmlFor="first-name"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Question Title
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="questionTitle"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-3">
    //           <label
    //             htmlFor="option1"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Option 1
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="option1"
    //               name="option1"
    //               type="text"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-3">
    //           <label
    //             htmlFor="option2"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Option 2
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="option2"
    //               name="option2"
    //               type="text"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="col-span-3">
    //           <label
    //             htmlFor="option3"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Option 3
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="option3"
    //               name="option3"
    //               type="text"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-3">
    //           <label
    //             htmlFor="option4"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Option 4
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="option4"
    //               name="option4"
    //               type="text"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>
    //         <div className="sm:col-span-3">
    //           <label
    //             htmlFor="correctOption"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Correct Option
    //           </label>
    //           <div className="mt-2">
    //             <select
    //               name="correctOption"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
    //             >
    //               <option value={`0`}>Option 1</option>
    //               <option value={`1`}>Option 2</option>
    //               <option value={`2`}>Option 3</option>
    //               <option value={`3`}> Option 4</option>
    //             </select>
    //           </div>
    //         </div>

    //         <div className="sm:col-span-3">
    //           <label
    //             htmlFor=""
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Points
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="points"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-6">
    //           <label
    //             htmlFor="explaination"
    //             className="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Explaination for correct answer
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               type="text"
    //               name="explaination"
    //               id="region"
    //               autoComplete="address-level1"
    //               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </details>
    // );
    setQuestionsDiv((prevState) => [
      ...prevState,
      {
        question: "",
        answers: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
        point: "",
      },
    ]);
  };

  const inputChangeHandler = (e) => {
    let name = e.target.name;
    if (name === "quizTitle") {
      setQuizTitle(e.target.value);
    } else if (name === "quizSynopsis") {
      setQuizSynopsis(e.target.value);
    }
  };

  const quizSubmitHandler = async (e) => {
    e.preventDefault();
    let questionsData = {
      course: courseId.id,
      instructor: location.state.user._id,
      quizTitle: quizTitle,
      quizSynopsis: quizSynopsis,
      nrOfQuestions: questionsDiv.length,
      questions: questionsDiv,
    };

    try {
      const res = await axios.post(BACKEND_URI + "/api/quiz", questionsData);
      console.log("ADD_QUIZ", res.data)
    } catch (error) {
        console.error(error)
    }
  };

  return (
    <div className="p-10 flex justify-center gap-14 w-full">
      <div className="w-2/5">
        <form className=" ml-10" onSubmit={quizSubmitHandler}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Please Enter the Quiz Details
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="quizTitle"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quiz Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="quizTitle"
                        id="quizTitle"
                        onChange={inputChangeHandler}
                        className="block flex-1 rounded border-1   py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quiz Synopsis
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="quizSynopsis"
                      name="quizSynopsis"
                      rows={1}
                      onChange={inputChangeHandler}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              name="addQuestion"
              onClick={addQuestionHandler}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Add Question
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="w-3/5 overflow-auto max-h-[calc(100vh-15rem)]">
        {questionsDiv && questionsDiv.length > 0 && (
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Questions
          </h2>
        )}

        <ul>
          {questionsDiv &&
            questionsDiv.map((question, index) => (
              <details key={index} className="m-4">
                <summary className="hover:cursor-pointer">
                  <span className="font-semibold"> Question {index + 1}</span>
                </summary>
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Question Title
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="questionTitle"
                          onChange={(e) => {
                            questionsDiv[index].question = e.target.value;
                            setQuestionsDiv([...questionsDiv]);
                          }}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="option1"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Option 1
                      </label>
                      <div className="mt-2">
                        <input
                          name="option1"
                          type="text"
                          onChange={(e) => {
                            questionsDiv[index].answers[0] = e.target.value;
                            setQuestionsDiv([...questionsDiv]);
                          }}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="option2"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Option 2
                      </label>
                      <div className="mt-2">
                        <input
                          name="option2"
                          type="text"
                          onChange={(e) => {
                            questionsDiv[index].answers[1] = e.target.value;
                            setQuestionsDiv([...questionsDiv]);
                          }}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="option3"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Option 3
                      </label>
                      <div className="mt-2">
                        <input
                          name="option3"
                          type="text"
                          onChange={(e) => {
                            questionsDiv[index].answers[2] = e.target.value;
                            setQuestionsDiv([...questionsDiv]);
                          }}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="option4"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Option 4
                      </label>
                      <div className="mt-2">
                        <input
                          name="option4"
                          type="text"
                          onChange={(e) => {
                            questionsDiv[index].answers[3] = e.target.value;
                            setQuestionsDiv([...questionsDiv]);
                          }}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="correctOption"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Correct Option
                      </label>
                      <div className="mt-2">
                        <select
                          name="correctOption"
                          onChange={(e) => {
                            questionsDiv[index].correctAnswer = e.target.value;
                            setQuestionsDiv([...questionsDiv]);
                          }}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option value={`0`}>Option 1</option>
                          <option value={`1`}>Option 2</option>
                          <option value={`2`}>Option 3</option>
                          <option value={`3`}> Option 4</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor=""
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Points
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="points"
                          onChange={(e) => {
                            questionsDiv[index].point = e.target.value;
                            setQuestionsDiv([...questionsDiv]);
                          }}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="explaination"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Explaination for correct answer
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="explaination"
                          onChange={(e) => {
                            questionsDiv[index].explanation = e.target.value;
                            setQuestionsDiv([...questionsDiv]);
                          }}
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            ))}
        </ul>
        {questionsDiv && questionsDiv.length > 0 && (
          <div className="bg-red-500 px-1 py-2 mt-4 text-white rounded max-w-fit flex gap-2 py-1 px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            <button
              onClick={(e) => {
                setQuestionsDiv(
                  questionsDiv.filter(
                    (_, index) => index !== questionsDiv.length - 1
                  )
                );
              }}
            >
              Delete Last Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizForm;
