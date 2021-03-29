import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { theme } from "./../../theme/theme";

const Search = () => {
  const history = useHistory();
  const [query, setQuery] = useState(history.location.pathname.split('/search/')[1] || "");
  const queryRef = useRef(null);

  useEffect(() => {
    if (history.location.pathname === "/search") {
      queryRef.current.focus();
    }
    if (query.length) {
      history.push(`/search/${query}`);
    }
  }, [history, query]);

  return (
    <SearchContainer>
      <SearchBox>
        <AiOutlineSearch size={"1.25rem"} />
        <SearchInput
          ref={queryRef}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => history.push("/search")}
          value={query}
        />
        {query.length ? <ImCross size={"0.875rem"} /> : null}
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
