import React from "react";
import Button from "./Button";

const Navbar = props => (
  <nav>
    <h3 className="center" id="c25">Student Tracker <span role="img">🕵️‍</span></h3>
    <div className="class-buttons" id="classBtn">
      <Button id="c__22" buttonTitle="Cohort 22"/>
      <Button id="c__23" buttonTitle="Cohort 23"/>
      <Button id="c__24" buttonTitle="Cohort 24"/>
      <Button id="c__25" buttonTitle="Cohort 25"/>
    </div>
  </nav>
);

export default Navbar;
