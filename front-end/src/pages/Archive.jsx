import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Shared/Layout/Layout";
import RenderCards from "./../components/RenderCards/RenderCards";
import { getNotesByType } from "./../redux/notesReducer/actions";
import { MessageContainer } from "./Active";
import { Status } from "./../redux/notesReducer/reducer";

const ArchivePage = () => {
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    dispatch(getNotesByType(Status.ARCHIVE));
  }, [dispatch]);

  return (
    <Layout>
      {notes.length === 0 ? (
        <MessageContainer>Archived notes will appear here</MessageContainer>
      ) : (
        <RenderCards
          notes={notes.filter(
            (note) => note.status === Status.ARCHIVE && !note.pinned
          )}
        />
      )}
    </Layout>
  );
};

export default ArchivePage;
