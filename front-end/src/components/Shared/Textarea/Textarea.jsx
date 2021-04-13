import React from "react";
import styled from "styled-components";
import { background, textColor } from "./../../../theme/theme";

const Textarea = (props) => {
  return <StyledTextarea {...props} />;
};

export default Textarea;

export const ForwardedTextarea = React.forwardRef((props, ref) => (
  <StyledTextarea ref={ref} {...props} />
));

const StyledTextarea = styled.textarea`
  background: ${background};
  border: none;
  color: ${textColor};
  font-size: 0.875rem;
  line-height: 20px;
  resize: none;
  outline: none;
  width: 100%;
`;
