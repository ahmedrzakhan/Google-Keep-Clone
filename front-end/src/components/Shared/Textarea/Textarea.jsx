import React from "react";
import styled from "styled-components";

const Textarea = (props) => {
  return <StyledTextarea {...props} />;
};

export default Textarea;

const StyledTextarea = styled.textarea`
  border: none;
  font-size: 0.875rem;
  line-height: 20px;
  resize: none;
  outline: none;
  width: 100%;
`;
