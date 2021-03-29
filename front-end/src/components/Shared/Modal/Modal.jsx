import React from "react";
import styled from "styled-components";

const Modal = ({ onClick, children }) => {
  return <StyledModal onClick={onClick}>{children}</StyledModal>;
};

export default Modal;

const StyledModal = styled.div`
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
