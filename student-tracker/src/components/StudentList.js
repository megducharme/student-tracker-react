import React, { Component } from "react"
import Student from "./Student"


export default class StudentList extends Component {
    
    render() {
        return (
            <div>
                <div className="output">
                    {
                        this.props.students.map(student => <Student key={student.githubHandle} student={student}/>)
                    }
                </div>
            </div>
        )
    }
}
