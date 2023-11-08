const FeedbackItem = ({ feedback, courseTitle }) => {
  return (
    <>
      <div className="flex-none snap-center w-80 h-96 max-h-96 overflow-auto no-scrollbar  snap-always max-w-full mr-8 md:pb-4 border shadow-md hover:shadow-xl bg-gray-300">
        <div className="px-4 py-2">
          <div className="text-lg font-medium">
            <span className="text-4xl">&#10077;</span>
            <p className="text-gray-800 mb-2 text-base">
              {feedback && feedback.description && feedback.description}
            </p>
          </div>
          {courseTitle && courseTitle.length>0 ? (<div className="flex gap-1 mt-4">
            <span className="bg-indigo-900 font-bold text-white rounded-full px-1 align-middle	">
              YC
            </span>
            <p className="text-lg">Yash C</p>
          </div>) : ''}
          
          <hr className="bg-gray-500 h-0.5 mt-4 mb-2" />
          <span className="text-indigo-800 font-bold text-lg">
            {courseTitle}
          </span>
        </div>
      </div>
    </>
  );
};
// w-60 md:w-1/3
export default FeedbackItem;
