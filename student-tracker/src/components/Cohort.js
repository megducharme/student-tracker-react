import React from 'react';
import StudentList from './StudentList';
import $ from "jquery";
import c22 from "./students/c22";
import c23 from "./students/c23";
import c24 from "./students/c24";
import c25 from "./students/c25";


class Cohort extends React.Component {
    constructor(props){
        super(props)

        let cohorts = {
            "c22": c22,
            "c23": c23,
            "c24": c24,
            "c25": c25
        }
    
        this.state = {
            students: cohorts[this.props.match.params.cohortId],
            studentObjs: []
        }
        
    }

    //create promises to gather data about each student from GitHub's API
    createPromises (students){
        let arrayOfPromises = [];

        this.state.students.forEach(student => {
            arrayOfPromises.push(
                fetch(`https://spyproxy.bangazon.com/student/commit/https://api.github.com/users/${student.githubHandle}/events`, {
                    type: "GET",
                }).then((events) => {
                    return events.json();
                })
            )
        })
        
        return arrayOfPromises
    }

    //once the data about the student's latest events come back from the GitHub API, build student objects 
    getStudentObject (data, students) {
        let studentName = students.find(student => {
            return student.githubHandle === data[0].actor.login;
        })
    
        let studentEvent = data.find(event => {
            return event.type === "PushEvent";
        })
    
        if (data[0].type === "ForkEvent") {
            studentEvent = data[0];
        }
        
        //use the student factory to structure student data
        return this.studentFactory(studentName, studentEvent);
    }

    //use the student data to format it in a way that makes it easy to render it to the DOM
    studentFactory(studentName, studentEvent) {
        try{
    
            let eventDate = new Date(studentEvent.created_at);
            let today = new Date(Date.now())
    
            const studentObject = Object.create(null, {
                name: {
                    value: studentName
                },
                githubHandle: {
                    value: studentEvent.actor.login
                },
                avatar: {
                    value: studentEvent.actor.avatar_url
                },
                eventType: {
                    value: studentEvent.type
                },
                date: {
                    value: parseInt((today - eventDate) / (1000 * 60 * 60 * 24))
                },
                repo: {
                    value: studentEvent.repo.name.split("/")[1]
                },
                message: {
                    value: (studentEvent.type === "ForkEvent") ? "-" : `"${studentEvent.payload.commits[studentEvent.payload.commits.length - 1].message}"`
                },
                repoURL: {
                    value: studentEvent.repo.url.split("repos/")[1],
                },
                diffDays: {
                    value: this.getDiffDays(eventDate),
                    writable: true
                },
                color: {
                    value: this.getStudentColor(this.getDiffDays(eventDate)),
                    writable: true
                }
            });

            return studentObject;

        }catch(err){
            console.log(err);
            return {
                name: {
                    "name": studentName.name,
                    "githubHandle": studentName.githubHandle
                },
                githubHandle: studentName.githubHandle,
                avatar: "../img/nopic.png",
                date: 0
            };
        }
    }
    
    //helper function for the student factory -- figures out color based on number of days since last commit
    getStudentColor(diffDays){
        switch (diffDays) {
            case " today":
                return this.color = "green";
            case " yesterday":
                return this.color = "green";
            case 2 + " days ago":
            case 3 + " days ago":
                return this.color = "yellow";
            default:
                return this.color = "red";
        }
    }
    
    //helper function for the student factory -- calculates the number of days since last commit
    getDiffDays(lastPush){
        let date = parseInt((new Date(Date.now()) - lastPush) / (1000 * 60 * 60 * 24))
    
        if(date === 0){
            return " today"
        }else if(date === 1){
            return " yesterday"
        }else{
            return date + " days ago"
        }
    }


    getStudentData(arrayOfPromises, students) {
        console.log({arrayOfPromises})
        console.log({students})
        return new Promise((resolve, reject) => {
            Promise.all(arrayOfPromises).then(responses => {
                console.log({responses})
                let studentObjs = []
                responses.forEach(response => {
                    studentObjs.push(this.getStudentObject(response, students));
                });
                resolve(studentObjs)
            })
        })
    }

        
    componentDidMount(){
        console.log("is this running?")
        $(".loader-gif").show()
        let promises = this.createPromises(this.state.students);
        this.getStudentData(promises, this.state.students)
        .then((studentObjs) => {
            studentObjs.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });
            this.setState({studentObjs: studentObjs})
            $(".loader-gif").hide()
        })
    }


    render() {
        return ( 
            <div>
                <StudentList students={this.state.studentObjs} />
            </div>
        )
    }

}

export default Cohort;