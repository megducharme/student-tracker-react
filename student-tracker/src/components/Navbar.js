import React from "react";
import Button from "./Button";
import { createHashHistory } from 'history'

const history = createHashHistory()

class Navbar extends React.Component {

  loadCohort = cohort => {
    this.context.history.push(`/cohort/${cohort}`)
  }

  render(){
    return(
      <nav>
        <h3 className="center" id="c25">Student Tracker <span role="img">🕵️‍</span></h3>
        <div className="class-buttons" id="classBtn">
          <Button id="c22" history={this.props.history} loadCohort={this.loadCohort} buttonTitle="Cohort 22"/>
          <Button id="c23" history={this.props.history} loadCohort={this.loadCohort} buttonTitle="Cohort 23"/>
          <Button id="c24" history={this.props.history} loadCohort={this.loadCohort} buttonTitle="Cohort 24"/>
          <Button id="c25" history={this.props.history} loadCohort={this.loadCohort} buttonTitle="Cohort 25"/>
        </div>
      </nav>
    )
  }
};

export default Navbar;