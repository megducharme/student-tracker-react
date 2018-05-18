import React from "react";
import Button from "./Button";

class Navbar extends React.Component {
  render(){
    return(
      <nav>
        <h3 className="center" id="c25">Student Tracker <span role="img">🕵️‍</span></h3>
        <div className="class-buttons" id="classBtn">
          <Button id="c22" buttonTitle="Cohort 22"/>
          <Button id="c23" buttonTitle="Cohort 23"/>
          <Button id="c24" buttonTitle="Cohort 24"/>
          <Button id="c25" buttonTitle="Cohort 25"/>
        </div>
      </nav>
    )
  }
};

export default Navbar;