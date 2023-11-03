import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";
import axios from "axios";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import Footer from "../Footer/Footer";
import { useLocation, useNavigate } from "react-router";
import draftToHtml from 'draftjs-to-html';
import {stateFromHTML} from 'draft-js-import-html';
import Alert from "../UI/Alert/Alert";
import {BACKEND_URI} from '../../config/constants'


const AddCourse = ({ setAlert, user, userType, isAuthenticated }) => {
  const [description, setDescription] = useState(EditorState.createEmpty());
  const navigate = useNavigate();

  const [courseDetails, setCourseDetails] = useState({
    title: "",
    briefSummary: "",
    description: "",
    courseImage: "",
    tags: []
  });

  const courseEditDetails = useLocation();

  useEffect(() => {
    setCourseDetails({
      title: courseEditDetails.state?.title,
      briefSummary: courseEditDetails.state?.brief_summary,
      courseImage: courseEditDetails.state?.courseImage,
      tags: courseEditDetails.state?.tags
    })
    setDescription(EditorState.createWithContent(stateFromHTML(courseEditDetails.state ? courseEditDetails.state.description : '')))
  }, [courseEditDetails.state])

  const newCourseSubmitHandler = (e) => {
    e.preventDefault();
    if(user.approved === false){
      alert('You are not approved yet by the administrator!')
      return;
    }
    const { title, briefSummary, courseImage } = courseDetails;
    const instructorId = user._id;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      title,
      brief_summary: briefSummary,
      description: draftToHtml(convertToRaw(description.getCurrentContent())),
      courseImage,
      instructor: instructorId,
    });

    const createCourse = async () => {
      let res;
      try {
        if(courseEditDetails && courseEditDetails.state){
          console.log("UPDATING_COURSE")
          res = await axios.put(BACKEND_URI + "/api/courses/"+courseEditDetails.state._id, body, config)
        }
        else{
          console.log("CREATING_COURSE")
          res = await axios.post(BACKEND_URI + "/api/courses/", body, config);
        }
        console.log(res.data);
        navigate("/course/"+res.data._id)
      } catch (error) {
        console.log(error);
        error.response.data.errors.forEach(error => setAlert(error.msg, 'danger'))
      }
    };
    createCourse();
  };

  const onChange = (e) => {
    setCourseDetails((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onEditorStateChange = (e) => {
    console.log("Editor: ", e);
    setDescription(e);
    console.log("HTML CONTENT", draftToHtml(convertToRaw(description.getCurrentContent())))
  };

  return (
    <>
      <Navbar />
      <Alert />
      <div className="p-6 bg-gray-100 flex items-center justify-center">
        <div className=" mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Add New Course
            </h2>
            <p className="text-gray-500 mb-6">
              Provide proper information to the course to make it attractive to
              potential students.
            </p>

            <form
              className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6"
              onSubmit={newCourseSubmitHandler}
            >
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Course Details</p>
                  <ol className="ml-4" style={{ listStyle: "disc" }}>
                    <li>Please fill out all the fields.</li>
                    <li>
                      You will be able to add course videos after submitting the
                      these basic details
                    </li>
                  </ol>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-5">
                    <div className="col-span-5">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={courseDetails.title}
                        onChange={(e) => onChange(e)}
                        id="title"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="col-span-5">
                      <label htmlFor="briefSummary">Brief Summary</label>
                      <input
                        type="text"
                        name="briefSummary"
                        value={courseDetails.briefSummary}
                        onChange={(e) => onChange(e)}
                        id="briefSummary"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Please add very brief summary of the course"
                      />
                    </div>

                    <div className="col-span-5">
                      <label className="mb-1" htmlFor="description">
                        Description
                      </label>
                      <Editor
                        editorState={description}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        id="description"
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="max-h-80"
                        editorClassName="overflow-y-auto max-h-60 bg-gray-50 p-2"
                        onEditorStateChange={onEditorStateChange}
                      />
                    </div>

                    <div className="col-span-5">
                      <label htmlFor="courseImage">Course Image URL</label>
                      <input
                        type="url"
                        name="courseImage"
                        value={courseDetails.courseImage}
                        onChange={(e) => onChange(e)}
                        id="courseImage"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Please enter a suitable imgae URL for your course"
                      />
                    </div>
                    <div className="col-span-5">
                      <label htmlFor="courseTags">Tags</label>
                      <input
                        type="text"
                        name="courseTags"
                        value={courseDetails.tags}
                        onChange={(e) => onChange(e)}
                        id="courseTags"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Please enter comma seperated tags for better search visibility of your course"
                      />
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

AddCourse.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  userType: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user,
  userType: state.authReducer.type,
});

export default connect(mapStateToProps, { setAlert })(AddCourse);
