import React, { Component } from "react";

export default class Student extends Component {
    render() {
        let event = (this.props.student.eventType === "ForkEvent") ? "Forked: " : "Last push: "
        return (
            <div className="card">
                <img className="student-avatar" src={`${this.props.student.avatar}`} />
                <h4>{`${this.props.student.name.name}`}</h4>
                <p className={`${this.props.student.color}`}>{`${event}`} {`${this.props.student.diffDays}`}</p>
                <a href={`https://github.com/${this.props.student.repoURL}`} target="_blank">
                    <p>{`${this.props.student.repo}`}</p>
                </a>
                <p>{`${this.props.student.message}`}</p>
                <a href={`https://github.com/${this.props.student.githubHandle}`} target="_blank">Student's Repo</a>
            </div>
        )
    }
}