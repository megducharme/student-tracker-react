import React from "react";

class Button extends React.Component {

    render(){
        return (
            <button className="class-buttons">
                <a onClick={() => this.props.loadCohort(this.props.id)} key={this.props.id}>{this.props.buttonTitle}</a>
            </button>
        )
    }
}

    
export default Button;