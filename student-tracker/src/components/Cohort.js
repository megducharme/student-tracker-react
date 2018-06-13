import React from 'react';
import App from "./App";
import c22 from "./students/c22";
import c23 from "./students/c23";
import c24 from "./students/c24";
import c25 from "./students/c25";

class Cohort extends React.Component {
    constructor(props){
        super(props);
        this.cohort = props.match.params.cohortId;
        this.init();
    }

    componentDidMount() {
        console.log("cohort mounted!");
        this.params = this.props.match;
    }


    init(){
        let cohorts = {
            "c22": c22,
            "c23": c23,
            "c24": c24,
            "c25": c25
        };
    
        const students = cohorts[this.cohort];
        this.createPromises(students);
    }



    createPromises (students){
        let arrayOfPromises = [];

        students.forEach(student => {
            arrayOfPromises.push(
                fetch(`https://spyproxy.bangazon.com/student/commit/https://api.github.com/users/${student.githubHandle}/events`, {
                    type: "GET",
                }).then((events) => {
                    return events.json();
                })
            )
        })

        this.getStudentData(arrayOfPromises, students)
    }

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
    
        return this.studentFactory(studentName, studentEvent);
    }


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
        let allStudentObjs = [];

        Promise.all(arrayOfPromises).then(responses => {
            responses.forEach(response => {
                allStudentObjs.push(this.getStudentObject(response, students));
            });
        }).then(() => {
            allStudentObjs.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });

            this.printToDOM(allStudentObjs);
        });

    }

    printToDOM(allStudentObjs){
        let stringToDOM = "";
    
        allStudentObjs.forEach(student => {
            let event = (student.eventType === "ForkEvent") ? "Forked: " : "Last push: "
    
            stringToDOM += `
                <div class="card">
                    <img class="student-avatar" src="${student.avatar}">
                    <h4>${student.name.name}</h4>
                    <p class="${student.color}">${event} ${student.diffDays}</p>
                    <a href="https://github.com/${student.repoURL}" target="_blank"><p style="color:black;">${student.repo}</p></a>
                    <p>${student.message}</p>
                    <a href="https://github.com/${student.githubHandle}" target="_blank">Student's Repo</a>
                </div>`
            
            document.getElementById("printHere").innerHTML = stringToDOM;
        });
    
    }
    


    render() {
        return ( 
            <div>
                <App assignClass="hide" />
            </div>
        )
    }
}

export default Cohort;