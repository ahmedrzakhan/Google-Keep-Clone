import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RenderCards from "./../components/RenderCards/RenderCards";
import styled from "styled-components";
import { clearNotes } from "./../redux/notesReducer/actions";
import Layout from "./../components/Shared/Layout/Layout";
import Loader, { LoaderContainer } from "./../components/Shared/Loader/Loader";
import { ListTitle } from "./Active";
import { Status } from "./../redux/notesReducer/reducer";
import { background } from "./../theme/theme";

const SearchPage = () => {
  const dispatch = useDispatch();
  const filteredNotes = useSelector((state) => state.notes.filteredNotes);
  const areNotesLoading = useSelector((state) => state.notes.areNotesLoading);

  useEffect(() => {
    dispatch(clearNotes());
  }, [dispatch]);

  const activeNotes = filteredNotes.filter(
    (note) => note.status === Status.ACTIVE
  );

  const archivedNotes = filteredNotes.filter(
    (note) => note.status === Status.ARCHIVE
  );

  return (
    <SearchPageContainer>
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
    </SearchPageContainer>
  );
};

export default SearchPage;

const SearchPageContainer = styled.div`
  background: ${background};
  min-height: 100vh;
`;
