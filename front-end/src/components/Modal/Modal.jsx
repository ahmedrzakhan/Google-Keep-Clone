import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { theme } from "./../../theme/theme";

const Modal = () => {
  const history = useHistory();
  const location = useLocation();

  const goBack = () => {
    history.push(location.state.background.pathname);
  };

  return (
    <ModalContainer onClick={goBack}>
      <ModalCard>ModalContainer</ModalCard>
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
  max-width: 25rem;
  max-height: 60vh;
  padding: 1rem;
`;
