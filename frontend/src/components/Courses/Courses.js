import "./Courses.css";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import CourseListItem from "../Course/CourseListItem";
import Footer from "../Footer/Footer";
import Pagination from "../Pagination/Pagination";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { BACKEND_URI } from "../../config/constants";



const Courses = () => {
  const [courseList, setCourseList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const params = { params: { page: currentPage } }
      const res = await axios.get(BACKEND_URI + "/api/courses/all/", params, {
      onUploadProgress: (progressEvent) => {
        setIsLoading(true)
      }
    });
      console.log(res.data);
      setCourseList(res.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setCourseList([]);
    }
  };

  useEffect(() => {
    setIsLoading(true)
    fetchCourses();
  }, [currentPage]);

  const onCurrentPageChangeHandler = e => {
    let buttonName = e.currentTarget.name
    if(buttonName === 'previous'){
      setCurrentPage((previousPage) => +(previousPage -1))
    }else if(buttonName === 'next'){
      setCurrentPage((previousPage) => +(previousPage +1))
    }
    setCurrentPage(buttonName)

  }

  
  return (
    <>
   
      <Navbar />
      <div className={`bg-white`}>
        <div>
          {/* Mobile filter dialog */}
          {/* <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    Filters
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>
                      <ul className="px-2 py-3 font-medium text-gray-900">
                        {subCategories.map((category) => (
                          <li key={category.name}>
                            <a href={category.href} className="block px-2 py-3">
                              {category.name}
                            </a>
                          </li>
                        ))}
                      </ul>

                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root> */}

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                All Courses
              </h1>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <Pagination onCurrentPageChangeHandler={onCurrentPageChangeHandler} totalResult={courseList?.allCoursesCount} currentPage={currentPage}/>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
               

                {/* Product grid */}

                <div className={`lg:col-span-4 `}>
                <LoadingSpinner isLoading={isLoading}/>

                  <div className={`courses mb-8 ${isLoading && 'hidden'}`}>
                    <div className="grid-cols-1 sm:grid md:grid-cols-4 lg:grid-cols-4">
                      {courseList && courseList.courses?.map((course) => (
                        <CourseListItem key={course.id} course={course} />
                      ))}
                    </div>
                  </div>
                  <Pagination onCurrentPageChangeHandler={onCurrentPageChangeHandler} totalResult={courseList?.allCoursesCount} currentPage={currentPage}/>

                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Courses;
