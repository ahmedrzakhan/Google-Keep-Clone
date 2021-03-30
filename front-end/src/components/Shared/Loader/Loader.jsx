import React from "react";
import styled from "styled-components";
import { appTheme } from "./../../../theme/theme";

const Loader = () => {
  return <StyledLoader />;
};

export default Loader;

const StyledLoader = styled.div`
  border: 2px solid ${appTheme.white};
  border-top: 2px solid ${appTheme.lightBlue};
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;
