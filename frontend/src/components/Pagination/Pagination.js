import React, { useState } from "react";

const RESULTS_PER_PAGE = 8;

const Pagination = ({
  onCurrentPageChangeHandler,
  totalResult,
  currentPage,
}) => {
  console.log(currentPage);

  const PageNumberButtons = () => {
    let pageNumberButtonJSX = [];
    for (
      let index = 0;
      index < parseInt(Math.ceil(totalResult / RESULTS_PER_PAGE));
      index++
    ) {
      if (index === 3) {
        pageNumberButtonJSX.push(
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
            ...
          </span>
        );
        index = totalResult - 3;
      }
      pageNumberButtonJSX.push(
        <button
          name={index + 1}
          onClick={onCurrentPageChangeHandler}
          aria-current="page"
          className={
            index + 1 === currentPage
              ? "z-10 px-4 py-2 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              : "text-gray-900 px-4 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
          }
        >
          {index + 1}
        </button>
      );
    }
    console.log(pageNumberButtonJSX);
    return pageNumberButtonJSX;
  };

  return (
    <div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            name="Previous"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            name="Next"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing
              <span className="font-medium">
                {" "}
                {parseInt(currentPage) === 1
                  ? currentPage
                  : (currentPage - 1) * RESULTS_PER_PAGE}{" "}
              </span>
              to
              <span className="font-medium">
                {" "}
                {currentPage * RESULTS_PER_PAGE < totalResult
                  ? currentPage * RESULTS_PER_PAGE
                  : totalResult}{" "}
              </span>
              of
              <span className="font-medium"> {totalResult} </span>
              results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                name="previous"
                onClick={onCurrentPageChangeHandler}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg
                  name="previous"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <PageNumberButtons />
              <button
                name="next"
                onClick={onCurrentPageChangeHandler}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
