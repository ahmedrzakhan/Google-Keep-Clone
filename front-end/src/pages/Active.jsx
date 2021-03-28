import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Layout from "./../components/Layout/Layout";
import RenderCards from "./../components/RenderCards/RenderCards";
import { addNote, getNotesByType } from "./../redux/notesReducer/actions";
import { Status } from "./../redux/notesReducer/reducer";
import { theme } from "./../theme/theme";

const ActivePage = () => {
  const [showNotepad, setShowNotepad] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rowSize, setRowSize] = useState(1);

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  const minRows = 1,
    maxRows = 10;

  useEffect(() => {
    dispatch(getNotesByType(Status.ACTIVE));
  }, [dispatch]);

  const unPinnedActiveNotes = useMemo(
    () => notes.filter((note) => note.status === Status.ACTIVE && !note.pinned),
    [notes]
  );

  const pinnedActiveNotes = useMemo(() => notes.filter((note) => note.pinned), [
    notes,
  ]);

  const handleDescriptionChange = (e) => {
    const textareaLineHeight = 36;

    const previousRows = e.target.rows;
    e.target.rows = minRows;
    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }
    setDescription(e.target.value);
    setRowSize(currentRows < maxRows ? currentRows : maxRows);
  };

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
          setRowSize(minRows);
        })
        .catch((err) => console.log("Add Note Failed", err));
    }

    setShowNotepad(false);
  };

  return (
    <Layout>
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
              rows={rowSize}
              onChange={(e) => handleDescriptionChange(e)}
              onFocus={() => setShowNotepad(true)}
              placeholder="Take a note..."
              showNotepad={showNotepad}
              value={description}
            />
          </NoteDescriptionInputWrapper>
          {showNotepad && (
            <CloseButtonContainer>
              <CloseButton onClick={handleCloseNotepad}>Close</CloseButton>
            </CloseButtonContainer>
          )}
        </NotepadWrapper>
      </NotepadContainer>

      {!pinnedActiveNotes.length && !unPinnedActiveNotes.length && (
        <MessageContainer>Add new Notes</MessageContainer>
      )}

      {pinnedActiveNotes.length > 0 && (
        <>
          <ListTitle>PINNED</ListTitle>
          <RenderCards notes={pinnedActiveNotes} />
        </>
      )}

      {unPinnedActiveNotes.length > 0 && (
        <>
          <ListTitle>Others</ListTitle>
          <RenderCards notes={unPinnedActiveNotes} />
        </>
      )}
    </Layout>
  );
};

export default ActivePage;

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
      ? `0.75px 0.75px 8px ${theme.dullGrey}, -0.75px -0.75px 3px ${theme.dullGrey}`
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
  line-height: 36px;
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

export const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
