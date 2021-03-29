import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Layout from "../components/Shared/Layout/Layout";
import RenderCards from "./../components/RenderCards/RenderCards";
import Textarea from "../components/Shared/Textarea/Textarea";
import Input from "./../components/Shared/Input/Input";
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
    const { target } = e;
    let { rows, scrollHeight, value } = target;

    const textareaLineHeight = 20;
    const previousRows = rows;
    rows = minRows;
    const currentRows = ~~(scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      rows = currentRows;
    } else if (currentRows >= maxRows) {
      rows = maxRows;
    }

    setDescription(value);
    setRowSize(currentRows < maxRows ? currentRows : maxRows);
  };

  const handleCloseNotepad = () => {
    if (title.length || description.length) {
      const payload = {
        date: new Date(),
        description: description.split("\n"),
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
            <Input
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              value={title}
            />
          )}
          <NoteDescriptionInputWrapper showNotepad={showNotepad}>
            <Textarea
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

export const ListTitle = styled.div`
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
  padding: 0.5rem;
  border-radius: 0.125rem;
  box-shadow: ${({ showNotepad }) =>
    showNotepad
      ? 0
      : `0.75px 0.75px 5px ${theme.dullGrey}, -0.75px -0.75px 3px ${theme.dullGrey}`};
`;

const CloseButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 0.125rem;
  width: 100%;
`;

export const CloseButton = styled.button`
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
