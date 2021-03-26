import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotesByType } from "./../redux/notesReducer/actions";
import RenderCards from "./../components/RenderCards/RenderCards";
import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import { theme } from "./../theme/theme";
import { Status } from "./../redux/notesReducer/reducer";

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

  let isHomePage = false,
    isArchivePage = false;

  if (status === "Active") {
    isHomePage = true;
  } else if (status === "Archive") {
    isArchivePage = true;
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
        {isHomePage && (
          <RenderCards
            notes={notes.filter(
              (note) => note.status === Status.ACTIVE && !note.pinned
            )}
          />
        )}
        {isArchivePage && (
          <RenderCards
            notes={notes.filter((note) => note.status === Status.ARCHIVE)}
          />
        )}
      </Layout>
    </React.Fragment>
  );
};

export default Dashboard;

const ListTitle = styled.div`
  color: ${theme.darkGrey};
  font-size: 0.75rem;
  font-weight: 700;
  margin-left: 1rem;
`;
