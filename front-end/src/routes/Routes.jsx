import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import ActivePage from "./../pages/Active";
import ArchivePage from "./../pages/Archive";
import SearchPage from "./../pages/Search";
import NoteModal from "./../components/NoteModal/NoteModal";

const Routes = () => {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Route path="/" exact render={() => <ActivePage />} />
        <Route path="/archive" render={() => <ArchivePage />} />
        <Route path="/search" render={() => <SearchPage />} />
        <Route path="*" render={() => <ActivePage />} />
      </Switch>
      {background && <Route path="/Note/:id" children={() => <NoteModal />} />}
    </>
  );
};

export default Routes;
