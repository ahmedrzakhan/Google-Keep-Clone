import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotesByType } from "./../redux/notesReducer/actions";
import RenderCards from "./../components/RenderCards/RenderCards";
import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import { theme } from "./../theme/theme";

const Dashboard = () => {
  const history = useHistory();
  const pathname = history.location.pathname;
  let status;
  if (pathname === "/") {
    status = "Active";
  } else {
    status = "Archive";
  }
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes.notes);
  console.log("notes", notes);

  let isHomePage = false;

  if ( status === "Active") {
    isHomePage = true
  }

  useEffect(() => {
    dispatch(getNotesByType(status));
  }, [dispatch, status]);

  if (!notes.length) {
    return null;
  }

  return (
    <React.Fragment>
      <Layout>
        {isHomePage && <ListTitle>PINNED</ListTitle>}
        {isHomePage && (
          <RenderCards notes={notes.filter((note) => note.pinned)} />
        )}

        {isHomePage && <ListTitle>Others</ListTitle>}
        {<RenderCards notes={notes.filter((note) => !note.pinned)} />}
      </Layout>
    </React.Fragment>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  column-count: 4;
  column-gap: 0.5rem;
  margin-bottom: 3rem;
`;

const ListTitle = styled.div`
  color: ${theme.darkGrey};
  font-size: 0.75rem;
  font-weight: 700;
  margin-left: 1rem;
`;

const NoteCard = styled.div`
  border: 1px solid ${theme.grey};
  border-radius: 0.5rem;
  display: inline-block;
  margin: 0.5rem 0;
  min-height: 3.75rem;
  padding: 1rem 1.5rem;
  width: 15.25rem;
  word-break: break-all;
`;

const NoteTitle = styled.div`
  font-weight: 700;
  margin-bottom: 1rem;
`;
