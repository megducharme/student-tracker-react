import React from 'react';
import Navbar from "./Navbar";
import Main from "./Main";
import { Route } from 'react-router-dom'


class App extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Route render={history => (
                    <Navbar {...history} />
                )} />
                < Route render={history => (
                    <Main {...history} />
                )} />

                <div className="loader-gif">
                    <img src={"/img/loadingspin.gif"} alt={"spin loading"} className={`${this.props.assignClass}`}/>
                </div>
            </ React.Fragment>
        )
    }
}

export default App;