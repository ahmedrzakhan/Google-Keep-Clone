import React from "react";
import styled from "styled-components";
import { theme } from "./../../theme/theme";

const RenderCards = ({ notes }) => {
  return (
    <CardsContainer>
      {notes.map((note) => (
        <NoteCard key={note._id}>
          <NoteTitle>{note.title}</NoteTitle>
          {note.description}
        </NoteCard>
      ))}
    </CardsContainer>
  );
};

export default RenderCards;

const CardsContainer = styled.div`
  column-count: 4;
  column-gap: 0.5rem;
  margin-bottom: 3rem;
`;

const NoteCard = styled.div`
  border: 1px solid ${theme.grey};
  border-radius: 0.5rem;
  display: inline-block;
  margin: 0.5rem 0;
  min-height: 3.75rem;
  padding: 1rem 1.5rem;
  width: 15.25rem;
  word-break: break-all;
`;

const NoteTitle = styled.div`
  font-weight: 700;
  margin-bottom: 1rem;
`;
