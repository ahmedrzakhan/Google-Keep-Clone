import React from "react";
import { Route, Switch } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import ActivePage from "./../pages/Active";
import ArchivePage from "./../pages/Archive";

const Routes = () => {
  return (
    <div>
      {/* <Route path="/Note/:id" render={() => <Modal />} /> */}
      <Route path="/" exact render={() => <ActivePage /> }/>
      <Route path="/archive" render={() => <ArchivePage />} />
    </div>
  );
};

export default Routes;
