import React from 'react';
import Navbar from "./Navbar";


class Home extends React.Component {
    render() {
        return (
        <div>
            <Navbar/>
            <div className="loader-gif">
                <img src={"img/giphy (10).gif"} alt={"happy parrot"} className={`${this.props.assignClass}`}/>
            </div>
        </div>
        )
    }
}

export default Home;