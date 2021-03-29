import React from "react";
import { useSelector } from "react-redux";
import RenderCards from "./../components/RenderCards/RenderCards";
import Layout from "./../components/Shared/Layout/Layout";
import Loader, { LoaderContainer } from "./../components/Shared/Loader/Loader";
import { ListTitle } from "./Active";
import { Status } from "./../redux/notesReducer/reducer";

const SearchPage = () => {
  const filteredNotes = useSelector((state) => state.notes.filteredNotes);
  const areNotesLoading = useSelector((state) => state.notes.areNotesLoading);

  const activeNotes = filteredNotes.filter(
    (note) => note.status === Status.ACTIVE
  );

  const archivedNotes = filteredNotes.filter(
    (note) => note.status === Status.ARCHIVE
  );

  return (
    <Layout>
      {areNotesLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <>
          {activeNotes.length > 0 && <RenderCards notes={activeNotes} />}

          {activeNotes.length > 0 && archivedNotes.length > 0 && (
            <ListTitle>Others</ListTitle>
          )}
          {archivedNotes.length > 0 && <RenderCards notes={archivedNotes} />}
        </>
      )}
    </Layout>
  );
};

export default SearchPage;
