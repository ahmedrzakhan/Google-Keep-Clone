import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import ActivePage from "./../pages/Active";
import ArchivePage from "./../pages/Archive";

const Routes = () => {
  let location = useLocation();
  let background = location.state && location.state.background;

  console.log('location', location)
console.log('background', background)
  return (
    <>
      <Switch location={background || location}>
        <Route path="/" exact render={() => <ActivePage />} />
        <Route path="/archive" render={() => <ArchivePage />} />
      </Switch>
      {background && <Route path="/Note/:id" children={() => <Modal />} /> }
    </>
  );
};

export default Routes;
