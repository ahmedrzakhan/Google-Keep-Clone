import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./../pages/Dashboard";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" render={() => <Dashboard />} />
    </Switch>
  );
};

export default Routes;
