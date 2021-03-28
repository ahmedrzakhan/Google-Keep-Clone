import React from "react";
import styled from "styled-components";

const Modal = () => {
  return <ModalContainer>ModalContainer</ModalContainer>;
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