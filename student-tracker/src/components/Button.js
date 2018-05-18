import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Button extends React.Component {
    static propTypes = {
        history: PropTypes.object
      };

    getStudentData = (event) => {
        console.log(this.props.id, " was clicked");
        this.props.history.push(`/cohort/${this.props.id}`);
    };

    render(){
        return (
            <button className="class-buttons">
                <Link to={`/cohort/${this.props.id}`}>{this.props.buttonTitle}</Link>
            </button>
        )
    }
}

    
export default Button;