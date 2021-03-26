import React, { memo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { AiOutlineBulb } from "react-icons/ai";
import { IoArchiveOutline } from "react-icons/io5";

import { theme } from "./../../theme/theme";

const Sidebar = ({ isExpanded, path }) => {
  const history = useHistory();

  return (
    <SidebarContainer isExpanded={isExpanded}>
      <SidebarWrapper>
        <ListContainer>
          <SecondaryLink
            active={path === "/"}
            isExpanded={isExpanded}
            onClick={() => history.push("/")}
          >
            <IconContainer active={path === "/"}>
              <AiOutlineBulb size={"1.375rem"} />
            </IconContainer>
            {isExpanded && <LinkLabel>Notes</LinkLabel>}
          </SecondaryLink>
          <SecondaryLink
            active={path === "/archive"}
            isExpanded={isExpanded}
            onClick={() => history.push("/archive")}
          >
            <IconContainer active={path === "/archive"}>
              <IoArchiveOutline size={"1.375rem"} />
            </IconContainer>
            {isExpanded && <LinkLabel>Archive</LinkLabel>}
          </SecondaryLink>
        </ListContainer>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default memo(Sidebar);

const SidebarContainer = styled.div`
  min-width: ${({ isExpanded }) => (isExpanded ? "12rem" : "3rem")};
  transition: min-width 0.2s ease 0s;
`;

const SidebarWrapper = styled.div`
  position: sticky;
  top: 4.875rem;
`;

const IconContainer = styled.div`
  background: ${({ active }) => (active ? theme.lightYellow : "transparent")};
  border-radius: 50%;
  margin-left: 1rem;
  padding: 0.5rem;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SecondaryLink = styled.div`
  align-items: center;
  background: ${({ isExpanded, active }) =>
    isExpanded && active ? theme.lightYellow : "transparent"};
  border-radius: 0 1.675rem 1.675rem 0;
  cursor: pointer;
  display: flex;
  padding: 0.5rem;
`;

const LinkLabel = styled.div`
  margin-left: 1.5rem;
`;
