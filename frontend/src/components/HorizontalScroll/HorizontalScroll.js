import CourseItem from "../Courses/CourseItem";
import FeedbackItem from "../FeedbackItem/FeedbackItem";

import './HorizontalScroll.css'

const HorizontalScroll = (props) => {
  console.log("COURSE TITLE: ", props.courseTitle)
  return (
    <>
      <div className="courses flex-grow w-full px-10 mx-auto overflow-hidden">
        <div className="mx-auto w-full px-4">
          <div className="my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-medium">
                {props.title}
              </h2>
            </div>
            <div
              id="scrollContainer"
              className="no-scrollbar p-4 flex flex-no-wrap overflow-x-scroll scrolling-touch items-start "
            >
              {props.items && props.items.courses && props.items.courses.map((item, index) => (
                <CourseItem course={item} key={index}/>
              ))}
               {props.feedbackItems && props.feedbackItems.length>0 ? props.feedbackItems.map((item, index) => (
                <FeedbackItem feedback={item} courseTitle={props.courseTitle} key={index}/>
              )) : (<FeedbackItem feedback={{description: "No Feedbacks for this course!!"}} courseTitle={""} key={1}/>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalScroll;
