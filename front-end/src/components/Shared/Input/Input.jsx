import React from 'react'
import styled from "styled-components";

const Input = (props) => {
    return (
        <StyledInput {...props} />
    )
}

export default Input

const StyledInput = styled.input`
  border: none;
  outline: none;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 700;
  width: 100%;
`