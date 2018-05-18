import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Cohort from "./Cohort";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/cohort/:cohortId" component={Cohort} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
