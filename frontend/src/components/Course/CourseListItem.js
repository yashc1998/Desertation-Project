import React from "react";
import { NavLink } from "react-router-dom";

const CourseListItem = ({ course }) => {
  return (
    <div className="mx-3 mt-6 flex flex-col rounded-lg border-2 border-[#e5e7e8] hover:shadow-xl transition-shadow delay duration-200 hover:ease-in sm:shrink-0 sm:grow sm:basis-0">
      <NavLink to={`/course/${course._id}`}>
        <img
          className="rounded-t-lg"
          src="https://tecdn.b-cdn.net/img/new/standard/city/041.webp"
          alt="Hollywood Sign on The Hill"
        />
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-gray-900">
            {course.title}
          </h5>
          <p className="mb-4 text-base text-gray-600">{course.brief_summary}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default CourseListItem;
