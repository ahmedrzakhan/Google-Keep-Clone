import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  clearNote,
  deleteNote,
  getNoteById,
  updateNote,
} from "../../redux/notesReducer/actions";
import {
  RiInboxArchiveLine,
  RiInboxUnarchiveLine,
  RiPushpin2Fill,
  RiPushpin2Line,
} from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../Shared/Modal/Modal";
import Input from "../Shared/Input/Input";
import Textarea from "../Shared/Textarea/Textarea";
import Loader from "./../Shared/Loader/Loader";
import { CloseButton } from "../../pages/Active";
import { Status } from "../../redux/notesReducer/reducer";
import { background, iconBackground, textColor } from "../../theme/theme";

const NoteModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([]);
  const [rowSize, setRowSize] = useState(1);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const isNoteLoading = useSelector((state) => state.notes.isNoteLoading);
  const note = useSelector((state) => state.notes.note);
  const minRows = 1,
    maxRows = 10;
  const id = location.pathname.split("/Note/")[1];

  useEffect(() => {
    dispatch(getNoteById(id));

    return () => {
      dispatch(clearNote());
    };
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
    const textareaLineHeight = 20;
    const previousRows = e.target.rows;
    e.target.rows = minRows;
    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    } else if (currentRows >= maxRows) {
      e.target.rows = maxRows;
    }

    setDescription(e.target.value);
    setRowSize(currentRows < maxRows ? currentRows : maxRows);
  };

  const handleCloseModal = () => {
    const { _id, pinned, status } = note;

    // make update API call only if values are updated
    if (
      JSON.stringify(note.description) ===
        JSON.stringify(description.split("\n")) &&
      JSON.stringify(note.title) === JSON.stringify(title)
    ) {
      goBack();
      return;
    }

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
    <Modal onClick={handleCloseModal}>
      {isNoteLoading ? (
        <Loader />
      ) : (
        <ModalCard onClick={(e) => e.stopPropagation()}>
          <ContentContainer>
            <Input
              autoFocus={title.length > 0}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              value={title}
            />
            <Textarea
              autoFocus={description.length > 0}
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
      )}
    </Modal>
  );
};

export default NoteModal;

const ModalCard = styled.div`
  background: ${background};
  border-radius: 0.25rem;
  color: ${textColor};
  max-height: 40rem;
  width: 35rem;
`;

const ContentContainer = styled.div`
  padding: 1rem 1rem 0 1rem;
`;

// const NoteTitle = styled(ForwardedInput)`
//   font-size: 1.25rem;
// `;

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
    background: ${iconBackground};
    border-radius: 50%;
  }
  margin: 0 0.5rem;
`;
