import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  deleteNote,
  getNoteById,
  updateNote,
} from "./../../redux/notesReducer/actions";
import {
  RiInboxArchiveLine,
  RiInboxUnarchiveLine,
  RiPushpin2Fill,
  RiPushpin2Line,
} from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import Input from "./../Shared/Input/Input";
import Textarea from "./../Shared/Textarea/Textarea";
import { CloseButton } from "./../../pages/Active";
import { Status } from "./../../redux/notesReducer/reducer";
import { theme } from "./../../theme/theme";

const Modal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([]);
  const [rowSize, setRowSize] = useState(1);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const note = useSelector((state) => state.notes.note);

  const minRows = 1,
    maxRows = 10;
  const id = location.pathname.split("/Note/")[1];

  useEffect(() => {
    dispatch(getNoteById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (Object.keys(note).length) {
      setTitle(note.title);
      setDescription(note.description.join("\n"));
      setRowSize(
        note.description.length < maxRows ? note.description.length : maxRows
      );
    }
  }, [note]);

  const goBack = () => {
    history.push(location.state.background.pathname);
  };

  const togglePinStatus = () => {
    let { date, pinned, status, _id } = note;

    pinned = !pinned;
    if (status === Status.ARCHIVE) {
      status = Status.ACTIVE;
    }
    const payload = {
      note: {
        description: description.split("\n"),
        pinned,
        status,
        title,
        date,
      },
      _id,
    };

    dispatch(updateNote(payload))
      .then(() => {
        goBack();
      })
      .catch((err) => {
        console.log("togglePinStatus failed", err);
      });
  };

  const toggleNoteStatus = () => {
    const { date, _id } = note;

    let { pinned, status } = note;

    status = status === Status.ARCHIVE ? Status.ACTIVE : Status.ARCHIVE;

    if (pinned) {
      pinned = false;
    }

    const payload = {
      note: {
        description: description.split("\n"),
        pinned,
        status,
        title,
        date,
      },
      _id,
    };

    dispatch(updateNote(payload))
      .then(() => {
        goBack();
      })
      .catch((err) => {
        console.log("togglePinStatus failed", err);
      });
  };

  const handleDeleteNote = () => {
    dispatch(deleteNote(note._id))
      .then(() => {
        goBack();
      })
      .catch((err) => {
        console.log("handleDeleteNote failed", err);
      });
  };

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

  const handleCloseModal = () => {
    const { _id, pinned, status } = note;
    const payload = {
      note: {
        description: description.split("\n"),
        pinned,
        status,
        title,
        date: new Date(),
      },
      _id,
    };

    dispatch(updateNote(payload))
      .then(() => {
        goBack();
      })
      .catch((err) => {
        console.log("UpdateNote failed", err);
      });
  };

  return (
    <ModalContainer onClick={handleCloseModal}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ContentContainer>
          <NoteTitle
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            value={title}
          />
          <Textarea
            onChange={(e) => handleDescriptionChange(e)}
            value={description}
            rows={rowSize}
            placeholder="Add Description"
          />
        </ContentContainer>
        <ActionContainer>
          <IconsContainer>
            <IconContainer onClick={togglePinStatus}>
              {/* pinned is a boolean */}
              {note.pinned ? (
                <RiPushpin2Fill size={"1.125rem"} />
              ) : (
                <RiPushpin2Line size={"1.125rem"} />
              )}
            </IconContainer>
            <IconContainer onClick={toggleNoteStatus}>
              {note.status === Status.ACTIVE ? (
                <RiInboxArchiveLine size={"1.125rem"} />
              ) : (
                <RiInboxUnarchiveLine size={"1.125rem"} />
              )}
            </IconContainer>
            <IconContainer onClick={handleDeleteNote}>
              <AiOutlineDelete size={"1.125rem"} />
            </IconContainer>
          </IconsContainer>
          <CloseButton onClick={handleCloseModal}>Close</CloseButton>
        </ActionContainer>
      </ModalCard>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalCard = styled.div`
  background: ${theme.white};
  border-radius: 0.25rem;
  width: 35rem;
`;

const ContentContainer = styled.div`
  padding: 1rem;
  margin-bottom: 0.25rem;
  max-height: 60vh;
`;

const NoteTitle = styled(Input)`
  font-size: 1.25rem;
`;

const ActionContainer = styled.div`
  align-items: center;
  box-shadow: 0 -2px 5px rgb(0 0 0 / 20%);
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

const IconsContainer = styled.div`
  display: flex;
`;

export const IconContainer = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  &:hover {
    background: ${theme.snowWhite};
    border-radius: 50%;
  }
  margin: 0 0.5rem;
`;

const Button = styled.div``;
