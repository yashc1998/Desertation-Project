import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import CourseItem from "../Courses/CourseItem";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { BACKEND_URI } from "../../config/constants";


const Search = () => {
  const [searchQuery] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState([]);
  const navigationRedirect = useNavigate();

  useEffect(() => {
    console.log("Inside USE EFFECT");
    console.log(searchQuery.get("query"));
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          BACKEND_URI + "/api/courses/all/" + searchQuery.get("query"),
          {
            onUploadProgress: (progress) => {
              setIsLoading(true);
            },
          }
        );
        setIsLoading(false);
        console.log(res.data);
        setSearchResults(res.data);
      } catch (error) {
        console.log(error);
        setSearchResults([]);
      }
    };
    fetchCourses();
  }, [searchQuery]);

  const onSearchHandler = (e) => {
    //console.log("Search");
    console.log(searchResults);
    if (e.key === "Enter" || e.target.id === "search-button") {
      console.log("Search");
      navigationRedirect({
        pathname: "/search",
        search: createSearchParams({
          query: e.key === "Enter" ? e.target.value : searchInput,
        }).toString(),
      });
    }
  };

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <Navbar />

      <div>
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative m-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            onKeyUp={onSearchHandler}
            onChange={searchInputHandler}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search courses here..."
            required
          />
          <button
            onClick={onSearchHandler}
            id="search-button"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </div>

      <LoadingSpinner isLoading={isLoading} />
      <div className="flex gap-4 p-4">
        {searchResults != null &&
        searchResults.courses != null &&
        searchResults.courses.length > 0 ? (
          searchResults.courses.map((course) => <CourseItem course={course} />)
        ) : (
          <h1>No Courses</h1>
        )}
      </div>
    </>
  );
};

export default Search;
