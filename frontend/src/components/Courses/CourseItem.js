import { NavLink } from "react-router-dom";
import "./CourseItem.css";


const CourseItem = ({course}) => {
  return (
    <div
      className="flex-none w-80 h-96 max-h-96 overflow-auto no-scrollbar md:w-1/3 mr-8 md:pb-4 border rounded-lg shadow-md hover:shadow-xl "
      style={{ width: "15rem" }}
    >
      <NavLink to={`/course/${course._id}`} className="space-y-4">
        <div className="">
          <img
            className="object-cover rounded-t-lg h-40 max-h-40"
            src={course.courseImage ? course.courseImage : "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixqx=3H1AJd0Pae&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"}
            alt=""
            width="300"
          />
        </div>
        <div className="px-4 py-2">
          <div className="text-lg leading-6 font-medium space-y-1">
            <p className="font-bold text-gray-800 mb-2">{course.title}</p>
          </div>
          <div className="">
            <p className="">{course.brief_summary}</p>
            <p className="font-medium text-sm text-indigo-600 mt-2">
              Read more<span className="text-indigo-600">&hellip;</span>
            </p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default CourseItem;
