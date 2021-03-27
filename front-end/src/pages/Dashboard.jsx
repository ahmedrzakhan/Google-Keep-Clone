import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNote, getNotesByType } from "./../redux/notesReducer/actions";
import RenderCards from "./../components/RenderCards/RenderCards";
import styled from "styled-components";
import Layout from "../components/Layout/Layout";
import { theme } from "./../theme/theme";
import { Status } from "./../redux/notesReducer/reducer";

const Dashboard = () => {
  const history = useHistory();
  const [showNotepad, setShowNotepad] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const pathname = history.location.pathname;
  let status;
  if (pathname === "/") {
    status = Status.ACTIVE;
  } else {
    status = Status.ARCHIVE;
  }
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes.notes);

  let isHomePage = false,
    isArchivePage = false;

  const unPinnedActiveNotes = useMemo(
    () => notes.filter((note) => note.status === Status.ACTIVE && !note.pinned),
    [notes]
  );

  const archivedNotes = useMemo(
    () => notes.filter((note) => note.status === Status.ARCHIVE),
    [notes]
  );

  const pinnedActiveNotes = useMemo(() => notes.filter((note) => note.pinned), [
    notes,
  ]);

  if (status === Status.ACTIVE) {
    isHomePage = true;
  } else if (status === Status.ARCHIVE) {
    isArchivePage = true;
  }

  useEffect(() => {
    dispatch(getNotesByType(status));
  }, [dispatch, status]);

  const handleCloseNotepad = () => {
    if (title.length || description.length) {
      // converting description into array to be able to
      //  render it in next line as it was created
      const noteDescription = description.split("\n");

      const payload = {
        description: noteDescription,
        pinned: false,
        status: Status.ACTIVE,
        title,
      };
      
      dispatch(addNote(payload))
        .then(() => {
          setDescription("");
          setTitle("");
        })
        .catch((err) => console.log("Add Note Failed", err));
    }

    setShowNotepad(false);
  };

  return (
    <React.Fragment>
      <Layout>
        {isHomePage && (
          <NotepadContainer>
            <NotepadWrapper showNotepad={showNotepad}>
              {showNotepad && (
                <NoteTitleInput
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  value={title}
                />
              )}
              <NoteDescriptionInputWrapper showNotepad={showNotepad}>
                <NoteDescriptionInput
                  onChange={(e) => setDescription(e.target.value)}
                  onFocus={() => setShowNotepad(true)}
                  placeholder="Take a Note..."
                  showNotepad={showNotepad}
                  value={description}
                ></NoteDescriptionInput>
              </NoteDescriptionInputWrapper>
              {showNotepad && (
                <CloseButtonContainer>
                  <CloseButton onClick={handleCloseNotepad}>Close</CloseButton>
                </CloseButtonContainer>
              )}
            </NotepadWrapper>
          </NotepadContainer>
        )}
        {isHomePage && pinnedActiveNotes.length > 0 && (
          <ListTitle>PINNED</ListTitle>
        )}
        {isHomePage && pinnedActiveNotes.length > 0 && (
          <RenderCards notes={pinnedActiveNotes} />
        )}

        {isHomePage && unPinnedActiveNotes.length > 0 && (
          <ListTitle>Others</ListTitle>
        )}
        {isHomePage && unPinnedActiveNotes.length > 0 && (
          <RenderCards notes={unPinnedActiveNotes} />
        )}

        {isArchivePage && !archivedNotes.length && (
          <div> No notes in Archive </div>
        )}

        {isArchivePage && archivedNotes.length > 0 && (
          <RenderCards notes={archivedNotes} />
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

const NotepadContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

const NotepadWrapper = styled.div`
  border-radius: 0.25rem;
  box-shadow: ${({ showNotepad }) =>
    showNotepad
      ? `0.75px 0.75px 5px ${theme.dullGrey}, -0.75px -0.75px 3px ${theme.dullGrey}`
      : 0};
  padding: 0.375rem 0.5rem;
  width: 33rem;
`;

const NoteDescriptionInputWrapper = styled.div`
  padding: 0 0.5rem;
  border-radius: 0.125rem;
  box-shadow: ${({ showNotepad }) =>
    showNotepad
      ? 0
      : `0.75px 0.75px 5px ${theme.dullGrey}, -0.75px -0.75px 3px ${theme.dullGrey}`};
`;

const NoteDescriptionInput = styled.textarea`
  border: none;
  font-size: 0.875rem;
  font-weight: ${({ showNotepad }) => (showNotepad ? 400 : 700)};
  height: 2.25rem;
  line-height: 2.25rem;
  resize: none;
  outline: none;
  width: 100%;
`;

const NoteTitleInput = styled.input`
  border: none;
  outline: none;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 700;
  width: 100%;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 0.125rem;
  width: 100%;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 0.125rem;
  color: ${theme.darkGrey};
  cursor: pointer;
  font-weight: 700;
  margin-right: 0.25rem;
  padding: 0.5rem 1rem;
  &:hover {
    background: ${theme.grey};
  }
`;
