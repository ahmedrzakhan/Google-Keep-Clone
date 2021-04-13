import React, { memo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Searchbar from "../../Searchbar/Searchbar";
import { toggleDarkTheme } from "./../../../redux/notesReducer/actions";
import { AiFillBook, AiOutlineMenu } from "react-icons/ai";
import { MdBrightness6, MdBrightness7 } from "react-icons/md";
import { appTheme, background } from "./../../../theme/theme";
import { IconContainer } from "./../../RenderCards/RenderCards";

const Navbar = ({ boxShadow, path, toggleSideBar }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const darkThemeEnabled = useSelector((state) => state.notes.darkThemeEnabled);

  let header;
  if (path === "/") {
    header = "Active";
  } else if (path === "/archive") {
    header = "Archive";
  } else if (path.includes("/search")) {
    header = "Search";
  }

  return (
    <NavbarContainer boxShadow={boxShadow} darkThemeEnabled={darkThemeEnabled}>
      <NavbarWrapper>
        <MenuAndLogo>
          <MenuConatiner onClick={toggleSideBar}>
            {darkThemeEnabled ? (
              <AiOutlineMenu color={appTheme.white} size={"1.25rem"} />
            ) : (
              <AiOutlineMenu size={"1.25rem"} />
            )}
          </MenuConatiner>
          <LogoAndTitle onClick={() => history.push("/")}>
            <AiFillBook color={appTheme.orange} size={"2.5rem"} />
            <Title>Keep</Title>
          </LogoAndTitle>
        </MenuAndLogo>
        <Title>{header && header}</Title>
        <Searchbar />
        <IconContainer onClick={() => dispatch(toggleDarkTheme())}>
          {darkThemeEnabled ? (
            <MdBrightness7 color={appTheme.white} size={"1.25rem"} />
          ) : (
            <MdBrightness6 color={appTheme.black} size={"1.25rem"} />
          )}
        </IconContainer>
      </NavbarWrapper>
    </NavbarContainer>
  );
};
export default memo(Navbar);

const NavbarContainer = styled.div`
  background: ${background};
  border-bottom: ${({ boxShadow, darkThemeEnabled }) =>
    boxShadow
      ? 0
      : darkThemeEnabled
      ? `1px solid ${appTheme.dullGrey}`
      : `1px solid ${appTheme.grey}`};
  box-shadow: ${({ boxShadow }) =>
    boxShadow ? "0 1px 10px rgb(0 0 0 / 10%), 0 1px 10px rgb(0 0 0 / 7%)" : 0};
  margin-bottom: 0.125rem;
  padding: 0.5rem;
  position: sticky;
  top: 0;
`;

const NavbarWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const MenuAndLogo = styled.div`
  align-items: center;
  display: flex;
`;

const MenuConatiner = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-left: 1.375rem;
`;

const LogoAndTitle = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  margin-left: 1rem;
`;

const Title = styled.div`
  font-size: 1.25rem;
  margin-left: 0.5rem;
`;
