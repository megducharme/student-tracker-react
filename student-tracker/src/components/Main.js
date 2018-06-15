import { Route, Redirect } from 'react-router-dom';
import React, { Component } from "react";
import Cohort from "./Cohort";
import $ from "jquery";

export default class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <Route path="/cohort/:cohortId" 
                render={(props) => {
                    $(".loader-gif").hide()
                    return <Cohort key={props.history.location.state.random} {...props} />
                }
                }
                />
            </ React.Fragment>
        )
    }
}