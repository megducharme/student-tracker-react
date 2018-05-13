import React from 'react';
import Navbar from "./Navbar";
import Home from "./Home";

class App extends React.Component {
    render() {
        return (
            <div className='student-tracker'>
                <div>
                    <Navbar/>
                    <Home />
                </div>
            </div>
        )
    }
}

export default App;