import React from "react";
import styled from "styled-components";
import { theme } from "./../../theme/theme";
import { AiOutlineSearch } from "react-icons/ai";
import { ImCross } from "react-icons/im";

const Search = () => {
  return (
    <SearchContainer>
      <SearchBox>
        <AiOutlineSearch size={"1.25rem"} />
        <SearchInput />
        <ImCross size={"0.875rem"} />
      </SearchBox>
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  margin-left: 1rem;
  width: 75%;
`;

const SearchBox = styled.div`
  align-items: center;
  background: ${theme.lightGrey};
  border-radius: 0.375rem;
  display: flex;
  justify-content: space-between;
  padding: 0.875rem;
  width: 80%;
`;

const SearchInput = styled.input`
  background: transparent;
  border: 0;
  margin: 0 0.375rem;
  outline: none;
  width: 100%;
`;
