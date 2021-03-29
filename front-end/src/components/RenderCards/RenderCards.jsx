import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { deleteNote, updateNote } from "./../../redux/notesReducer/actions";
import { theme } from "./../../theme/theme";
import { Status } from "./../../redux/notesReducer/reducer";
import {
  RiInboxArchiveLine,
  RiInboxUnarchiveLine,
  RiPushpin2Fill,
  RiPushpin2Line,
} from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";

const RenderCards = ({ notes }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const togglePinStatus = (note) => {
    const { date, description, _id, title } = note;
    let { pinned, status } = note;

    pinned = !pinned;
    if (status === Status.ARCHIVE) {
      status = Status.ACTIVE;
    }

    const payload = {
      note: { description, pinned, status, title, date },
      _id,
    };
    dispatch(updateNote(payload));
  };

  const toggleNoteStatus = (note) => {
    const { date, description, _id, title } = note;
    let { pinned, status } = note;

    status = status === Status.ARCHIVE ? Status.ACTIVE : Status.ARCHIVE;

    if (pinned) {
      pinned = false;
    }

    const payload = {
      note: { description, pinned, status, title, date },
      _id,
    };

    dispatch(updateNote(payload));
  };

  const handleDeleteNote = ({ _id }) => {
    dispatch(deleteNote(_id));
  };

  return (
    <CardsContainer>
      {notes.map((note) => (
        <NoteCard key={note._id}>
          <Link
            style={{ textDecoration: "none", color: `${theme.black}` }}
            to={{
              pathname: `/Note/${note._id}`,
              // This link sets the `background` in location state.
              state: { background: location },
            }}
          >
            <NoteTitle len={note.title.length}>{note.title}</NoteTitle>
            <NoteDescription len={note.description.length}>
              {note.description.map((description, index) => {
                if (!description.trim().length) {
                  // display empty line for empty strings
                  return <br key={index} />;
                }
                return <div key={index}>{description}</div>;
              })}
            </NoteDescription>
          </Link>

          <ActionsContainer>
            <IconContainer onClick={() => togglePinStatus(note)}>
              {/* pinned is a boolean */}
              {note.pinned ? (
                <RiPushpin2Fill size={"1.125rem"} />
              ) : (
                <RiPushpin2Line size={"1.125rem"} />
              )}
            </IconContainer>
            <IconContainer onClick={() => toggleNoteStatus(note)}>
              {note.status === Status.ACTIVE ? (
                <RiInboxArchiveLine size={"1.125rem"} />
              ) : (
                <RiInboxUnarchiveLine size={"1.125rem"} />
              )}
            </IconContainer>
            <IconContainer onClick={() => handleDeleteNote(note)}>
              <AiOutlineDelete size={"1.125rem"} />
            </IconContainer>
          </ActionsContainer>
        </NoteCard>
      ))}
    </CardsContainer>
  );
};

export default RenderCards;

const CardsContainer = styled.div`
  column-count: 4;
  column-gap: 0.5rem;
  margin-bottom: 1rem;
`;

const NoteCard = styled.div`
  border: 1px solid ${theme.grey};
  border-radius: 0.5rem;
  display: inline-block;
  margin-top: 0.5rem;
  /* min-height: 5rem; */
  padding: 1rem 1.5rem 0.5rem;
  width: 14.5rem;
  word-break: break-all;

  &:hover {
    box-shadow: inset 0.25px 0.25px 0.25px ${theme.darkGrey},
      inset -0.25px -0.25px 0.25px ${theme.darkGrey};
  }
`;

const NoteTitle = styled.div`
  font-weight: 700;
`;

const NoteDescription = styled.div`
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
  opacity: 0;
  transition: opacity 0.218s ease-in;

  ${NoteCard}:hover & {
    opacity: 1;
    transition: opacity 0.218s ease-in;
  }
`;

export const IconContainer = styled.div`
  cursor: pointer;
  padding: ${({ noPadding }) => (noPadding ? 0 : "0.5rem")};
  &:hover {
    background: ${theme.snowWhite};
    border-radius: 50%;
  }
`;
