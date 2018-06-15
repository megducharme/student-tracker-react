import React from "react";
import Button from "./Button";

class Navbar extends React.Component {

  changeCohort = (cohort) => {
    this.props.history.push({
      pathname: `/cohort/${cohort}`,
      state: {
        random: Date.now()
      }
    })
  }

  render(){
    return(
      <nav>
        <h3 className="center" id="c25">Student Tracker <span role="img">🕵️‍</span></h3>
        <div className="class-buttons" id="classBtn">
          <Button id="c22" changeCohort={this.changeCohort} buttonTitle="Cohort 22"/>
          <Button id="c23" changeCohort={this.changeCohort} buttonTitle="Cohort 23"/>
          <Button id="c24" changeCohort={this.changeCohort} buttonTitle="Cohort 24"/>
          <Button id="c25" changeCohort={this.changeCohort} buttonTitle="Cohort 25"/>
        </div>
      </nav>
    )
  }
};

export default Navbar;