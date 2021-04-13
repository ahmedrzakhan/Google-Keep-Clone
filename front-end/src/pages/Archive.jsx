import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Layout from "../components/Shared/Layout/Layout";
import RenderCards from "./../components/RenderCards/RenderCards";
import { clearNotes, getNotesByType } from "./../redux/notesReducer/actions";
import { MessageContainer } from "./Active";
import { Status } from "./../redux/notesReducer/reducer";
import Loader, { LoaderContainer } from "./../components/Shared/Loader/Loader";
import { background } from "./../theme/theme";

const ArchivePage = () => {
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes.notes);
  const areNotesLoading = useSelector((state) => state.notes.areNotesLoading);

  useEffect(() => {
    dispatch(getNotesByType(Status.ARCHIVE));

    return () => {
      dispatch(clearNotes());
    };
  }, [dispatch]);

  return (
    <ArchivePageContainer>
      <Layout>
        {areNotesLoading ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : (
          <>
            {notes.length === 0 ? (
              <MessageContainer>
                Archived notes will appear here
              </MessageContainer>
            ) : (
              <RenderCards
                notes={notes.filter(
                  (note) => note.status === Status.ARCHIVE && !note.pinned
                )}
              />
            )}
          </>
        )}
      </Layout>
    </ArchivePageContainer>
  );
};

export default ArchivePage;

const ArchivePageContainer = styled.div`
  background: ${background};
  min-height: 100vh;
`;
