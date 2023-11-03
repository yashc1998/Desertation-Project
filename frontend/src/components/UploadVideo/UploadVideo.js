import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { BACKEND_URI } from "../../config/constants";


const UploadVideo = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideoList, setSelectedVideoList] = useState([]);
  const [progress, setProgress] = useState(0);
  const courseDetails = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let selectedVideos = [];
    for (const key in videos) {
      if (videos.hasOwnProperty(key)) selectedVideos.push(videos[key].name);
    }
    setSelectedVideoList(selectedVideos);
  }, [videos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("VIDEOS: ", videos);
    if (videos.length === 0) {
      alert("Please select some videos");
      return;
    }
    let formdata = new FormData();
    for (let key in videos) {
      formdata.append("courseVideos", videos[key]);
    }
    console.log("FORM_DATA: ", formdata);
    if (courseDetails && courseDetails.state) {
      try {
        const res = await axios.put(
          `${BACKEND_URI}/api/courses/${courseDetails.state._id}/uploadvideos`,
          formdata,
          {
            onUploadProgress: (progressEvent) => {
              const progress =
                (progressEvent.loaded / progressEvent.total) * 100;
              setProgress(progress);
            },
          }
        );
        if (res.data) {
          setProgress(0);
          alert("Submitted");
        }
      } catch (error) {
        console.log(error);
        alert("Error happened!");
      }
    }
  };

  const onBackClick = e => {
    navigate(-1)
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center ml-16">
        <button className="mt-10 1/12" onClick={onBackClick}>
          <p className="bg-gray-900 p-3 rounded-full text-white">
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
                d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
              />
            </svg>
            
          </p>
        </button>
        <h2 className="font-semibold w-11/12 mt-10 text-2xl align-center text-center text-gray-600">
          Upload Video Lessons
        </h2>
      </div>
      <div className="w-full flex sm:px-8 content-start md:px-16 sm:py-8">
        <div className="justify-center items-center w-1/5">
          <p className="text-gray-500 mt-2 mb-6">
            Here you can upload the lesson videos for this course
          </p>
          <p>
            <span>Name:</span>{" "}
            <span className="font-bold">
              {courseDetails &&
                courseDetails.state &&
                courseDetails.state.title}
            </span>
          </p>
        </div>
        <main className="mx-auto max-w-screen-lg h-full w-4/5">
          <article
            aria-label="File Upload Modal"
            className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
            ondrop="dropHandler(event);"
            ondragover="dragOverHandler(event);"
            ondragleave="dragLeaveHandler(event);"
            ondragenter="dragEnterHandler(event);"
          >
            <form
              className="p-8 w-full h-full flex flex-col"
              onSubmit={handleSubmit}
            >
              <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                  <span>Drag and drop your</span>&nbsp;
                  <span>files here or click below</span>
                </p>
                <input
                  onChange={(e) => {
                    setVideos(e.target.files);
                  }}
                  id="dropzone-file"
                  type="file"
                  name="videos"
                  multiple
                  accept=".mp4, .mkv"
                  className=""
                />
              </header>

              {/* Upload Progress Bar */}
              {progress > 0 && (
                <>
                  <div className="flex justify-between mb-1 mt-4">
                    <span className="text-base font-medium text-blue-700">
                      Uploading
                    </span>
                    <span className="text-sm font-medium text-blue-700 dark:text-white">
                      {`${progress}%`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: progress + "%" }}
                    ></div>
                  </div>
                </>
              )}

              <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                To Upload
              </h1>
              <div className="max-h-30 overflow-auto">
                <ul
                  id="gallery"
                  className="pl-5 space-y-3 text-gray-600 list-disc marker:text-blue-600"
                >
                  {selectedVideoList &&
                    selectedVideoList.length > 0 &&
                    selectedVideoList.map((selectedVideo) => (
                      <li>{selectedVideo}</li>
                    ))}
                  <li
                    id="empty"
                    className="h-full w-full text-center flex flex-col items-center justify-center items-center"
                  >
                    {selectedVideoList.length === 0 && (
                      <div>
                        <img
                          className="mx-auto w-32"
                          src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                          alt="no data"
                        />
                        <span className="text-small text-gray-500">
                          No files selected
                        </span>
                      </div>
                    )}
                  </li>
                </ul>
              </div>

              <footer className="flex justify-end px-8 pb-8 pt-4">
                <button
                  id="submit"
                  type="submit"
                  className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
                >
                  Upload now
                </button>
              </footer>
            </form>
          </article>
        </main>
      </div>
    </>
  );
};

export default UploadVideo;
