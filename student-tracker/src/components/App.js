import React from 'react';
import Navbar from "./Navbar";


class App extends React.Component {
    render() {
        return (
        <div>
            <Navbar history={this.props.history} />
            <div className="loader-gif">
                <img src={"img/giphy (10).gif"} alt={"happy parrot"} className={`${this.props.assignClass}`}/>
            </div>
        </div>
        )
    }
}

export default App;