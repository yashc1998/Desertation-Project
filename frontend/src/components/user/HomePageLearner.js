import { Component } from "react";
import Courses from "../Courses/Courses";
import Navbar from "../Navbar";

class HomePageLearner extends Component {
  render() {
    return (
      <>
      <Navbar />
        <div>
          <h2>Continue the Learning</h2>
        </div>
        {/* <Courses /> */}
      </>
    );
  }
}

export default HomePageLearner;
