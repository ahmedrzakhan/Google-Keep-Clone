import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import RenderCards from "./../components/RenderCards/RenderCards";
import Layout from "./../components/Shared/Layout/Layout";
import { ListTitle } from "./Active";
import { Status } from "./../redux/notesReducer/reducer";

const SearchPage = () => {
  const location = useLocation();
  const filteredNotes = useSelector((state) => state.notes.filteredNotes);

  // Contains a truthy value if there are characters in url, otherwise falsy
  const showNotes = location.pathname.split("/search")[1];

  const activeNotes = filteredNotes.filter(
    (note) => note.status === Status.ACTIVE
  );

  const archivedNotes = filteredNotes.filter(
    (note) => note.status === Status.ARCHIVE
  );

  return (
    <Layout>
      {showNotes && activeNotes.length > 0 && (
        <RenderCards notes={activeNotes} />
      )}
      {showNotes && (
        <>
          {activeNotes.length > 0 && archivedNotes.length > 0 && (
            <ListTitle>Others</ListTitle>
          )}
          <RenderCards notes={archivedNotes} />
        </>
      )}
    </Layout>
  );
};

export default SearchPage;
