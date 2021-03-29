import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { AiOutlineSearch } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { theme } from "../../theme/theme";
import { getNotesBySearch } from "../../redux/notesReducer/actions";
import { IconContainer } from "../RenderCards/RenderCards";

const Searchbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [query, setQuery] = useState(
    history.location.pathname.split("/search/")[1] || ""
  );
  const [focused, setFocused] = React.useState(false);
  const queryRef = useRef(null);
  const debouncedSearchTerm = useDebounce(query, 500);

  useEffect(() => {
    if (history.location.pathname.includes("/search")) {
      queryRef.current.focus();

      if (!query.length) {
        history.push("/search");
      }
    }
    if (query.length >= 3) {
      history.push(`/search/${query}`);
    }
  }, [history, query]);

  useEffect(() => {
    if (debouncedSearchTerm && query.length >= 3) {
      dispatch(getNotesBySearch(debouncedSearchTerm));
    }
  }, [dispatch, debouncedSearchTerm, query.length]);

  const handleOnSearchBlur = () => {
    setFocused(false);
    setQuery("");
  };

  const handleOnSearchFocus = () => {
    history.push("/search");
    setFocused(true);
  };

  return (
    <SearchContainer>
      <SearchBox focused={focused}>
        <IconContainer>
          <AiOutlineSearch size={"1.375rem"} />
        </IconContainer>
        <SearchInput
          onChange={(e) => setQuery(e.target.value)}
          onBlur={handleOnSearchBlur}
          onFocus={handleOnSearchFocus}
          ref={queryRef}
          value={query}
        />
        {query.length ? (
          <IconContainer>
            <ImCross onClick={() => setQuery("")} size={"0.875rem"} />
          </IconContainer>
        ) : null}
      </SearchBox>
    </SearchContainer>
  );
};

export default Searchbar;

const SearchContainer = styled.div`
  margin-left: 1rem;
  width: 75%;
`;

const SearchBox = styled.div`
  align-items: center;
  background: ${({ focused }) => (focused ? theme.white : theme.lightGrey)};
  border-radius: 0.375rem;
  box-shadow: ${({ focused }) =>
    focused
      ? "1px 1px 0 rgb(65 69 73 / 30%), 0 1px 3px 1px rgb(65 69 73 / 15%)"
      : 0};
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  width: 80%;
`;

const SearchInput = styled.input`
  background: transparent;
  border: 0;
  font-size: 1rem;
  margin: 0 0.375rem;
  outline: none;
  width: 100%;
`;
