import React, { memo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import theme from "styled-theming";
import { AiOutlineBulb } from "react-icons/ai";
import { IoArchiveOutline } from "react-icons/io5";
import { appTheme, background, textColor } from "./../../../theme/theme";

export const labelAndIconBackground = theme("theme", {
  light: appTheme.lightYellow,
  dark: appTheme.darkYellow,
});

const Sidebar = ({ isExpanded, path }) => {
  const history = useHistory();

  return (
    <SidebarContainer isExpanded={isExpanded}>
      <SidebarWrapper>
        <ListContainer>
          <SecondaryLink
            active={path === "/" || path.includes("/search")}
            isExpanded={isExpanded}
            onClick={() => history.push("/")}
          >
            <IconContainer active={path === "/" || path.includes("/search")}>
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
  background: ${background};
  min-width: ${({ isExpanded }) => (isExpanded ? "12rem" : "3rem")};
  transition: min-width 0.2s ease 0s;
`;

const SidebarWrapper = styled.div`
  position: sticky;
  top: 4.875rem;
`;

const IconContainer = styled.div`
  background: ${({ active }) =>
    active ? labelAndIconBackground : "transparent"};
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
    isExpanded && active ? labelAndIconBackground : "transparent"};
  border-radius: 0 1.675rem 1.675rem 0;
  cursor: pointer;
  display: flex;
  padding: 0.5rem;
`;

const LinkLabel = styled.div`
  color: ${textColor};
  margin-left: 1.5rem;
`;
