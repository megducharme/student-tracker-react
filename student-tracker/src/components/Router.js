import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Cohort from "./Cohort";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/cohort/:cohortId" component={Cohort} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
