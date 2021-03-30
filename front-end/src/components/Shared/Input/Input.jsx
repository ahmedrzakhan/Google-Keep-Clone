import React from "react";
import styled from "styled-components";
import { background, textColor } from "./../../../theme/theme";

const Input = (props) => {
  return <StyledInput {...props} />;
};

export default Input;

const StyledInput = styled.input`
  background: ${background};
  border: none;
  color: ${textColor};
  outline: none;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 700;
  width: 100%;
`;
