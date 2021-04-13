import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import theme from "styled-theming";
import Layout from "../components/Shared/Layout/Layout";
import RenderCards from "./../components/RenderCards/RenderCards";
import Textarea, {
  ForwardedTextarea,
} from "../components/Shared/Textarea/Textarea";
import Input from "./../components/Shared/Input/Input";
import Loader, { LoaderContainer } from "./../components/Shared/Loader/Loader";
import {
  addNote,
  clearNotes,
  getNotesByType,
} from "./../redux/notesReducer/actions";
import { Status } from "./../redux/notesReducer/reducer";
import { appTheme, background, textColor } from "./../theme/theme";

const CloseButtonBackground = theme("theme", {
  light: appTheme.grey,
  dark: appTheme.darkGrey,
});

const ActivePage = () => {
  const [showNotepad, setShowNotepad] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rowSize, setRowSize] = useState(1);
  const textareaRef = useRef(null);
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const areNotesLoading = useSelector((state) => state.notes.areNotesLoading);
  const darkThemeEnabled = useSelector((state) => state.notes.darkThemeEnabled);
  const minRows = 1,
    maxRows = 10;

  useEffect(() => {
    textareaRef.current.focus();
    dispatch(getNotesByType(Status.ACTIVE));
    return () => {
      dispatch(clearNotes());
    };
  }, [dispatch]);

  const unPinnedActiveNotes = useMemo(
    () => notes.filter((note) => note.status === Status.ACTIVE && !note.pinned),
    [notes]
  );

  const pinnedActiveNotes = useMemo(() => notes.filter((note) => note.pinned), [
    notes,
  ]);

  const handleDescriptionChange = (e) => {
    if (!showNotepad) {
      setShowNotepad(true);
    }
    const textareaLineHeight = 20;

    const previousRows = e.target.rows;
    e.target.rows = minRows;
    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }
    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
    }

    setDescription(e.target.value);
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
    <ActivePageContainer>
      <Layout>
        <NotepadContainer>
          <NotepadWrapper
            darkThemeEnabled={darkThemeEnabled}
            showNotepad={showNotepad}
          >
            {showNotepad && (
              <Input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                value={title}
              />
            )}
            <NoteDescriptionInputWrapper
              darkThemeEnabled={darkThemeEnabled}
              showNotepad={showNotepad}
            >
              <ForwardedTextarea
                ref={textareaRef}
                rows={rowSize}
                onChange={(e) => handleDescriptionChange(e)}
                onClick={() => setShowNotepad(true)}
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

        {areNotesLoading ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : (
          <>
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
          </>
        )}
      </Layout>
    </ActivePageContainer>
  );
};

export default ActivePage;

const ActivePageContainer = styled.div`
  background: ${background};
  min-height: 100vh;
`;

export const ListTitle = styled.div`
  color: ${appTheme.darkGrey};
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
  border: ${({ darkThemeEnabled }) =>
    darkThemeEnabled ? `1px solid ${appTheme.dullGrey}` : 0};
  box-shadow: ${({ showNotepad, darkThemeEnabled }) =>
    darkThemeEnabled
      ? 0
      : showNotepad
      ? `0.75px 0.75px 8px ${appTheme.dullGrey}, -0.75px -0.75px 3px ${appTheme.dullGrey}`
      : 0};
  padding: 0.375rem 0.5rem;
  width: 33rem;
`;

const NoteDescriptionInputWrapper = styled.div`
  border-radius: 0.125rem;
  box-shadow: ${({ darkThemeEnabled, showNotepad }) =>
    darkThemeEnabled
      ? 0
      : showNotepad
      ? 0
      : `0.75px 0.75px 5px ${appTheme.dullGrey}, -0.75px -0.75px 3px ${appTheme.dullGrey}`};
  padding: 0.5rem;
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
  color: ${textColor};
  cursor: pointer;
  font-weight: 700;
  margin-right: 0.25rem;
  padding: 0.5rem 1rem;
  &:hover {
    background: ${CloseButtonBackground};
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
