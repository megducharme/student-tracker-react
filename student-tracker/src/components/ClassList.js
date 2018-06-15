import React, { Component } from 'react';
import Student from './Student';

class ClassList extends Component {
    constructor (props) {
        super(props);
        this.uuid = this.uuidGenerator();
    }

    uuidGenerator = function* () {
        while (true) {
            let time = new Date().getTime();
            let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
                const random = (time + Math.random() * 16) % 16 | 0;
                return (char === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
            })
            yield uuid
        }
    }


    render() {
        return (
            <div>
                {this.props.studentList.map(s => (
                    <Student avatar={s.avatar}
                             name={s.name.name}
                             diffDays={s.diffDays}
                             repoURL={s.repoURL}
                             repo={s.repo}
                             message={s.message}
                             githubHandle={s.githubHandle}
                             key={this.uuid.next().value} />
                ))}
            </div>
        );
    }
}

export default ClassList;
