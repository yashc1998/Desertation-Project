import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import { useLocation } from "react-router";


function CourseLessonPlay() {
    const [selectedLesson, setSelectedLesson] = useState({
        title: '',
        length: 0,
        url: ''
    });
    const videoRef = useRef();
    const randomVideo = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    useEffect(() => {    
        console.log("COURSE_DETAILS: ", courseDetails)
      videoRef.current?.load();
    }, [selectedLesson]);
    const courseDetails = useLocation()
  return (
    <>
      {" "}
      <Navbar /> 
      <div className="flex gap-8 max-h-screen">
        <div className="w-4/6 p-4">
            <video ref={videoRef} controls className="bg-white w-full">
                <source src={selectedLesson.url === "" ? randomVideo:`http://localhost:5000/${selectedLesson.url}`} />
                Error
            </video>
            <p className="font-bold text-2xl py-4">{selectedLesson.title}</p>
        </div>
        <div className="w-2/6 overflow-auto ">
        <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            {courseDetails.state && courseDetails.state.videos.map(video => (
                <li class="p-3 sm:py-4 hover:bg-gray-200 cursor-auto" onClick={(e) => setSelectedLesson(video)}>
                <button class="flex items-center space-x-4">
                   <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">
                         {video.title}
                      </p>
                   </div>
                </button>
             </li>
            ))}
            </ul>
        </div>
      </div>
    </>
  );
}

export default CourseLessonPlay;
