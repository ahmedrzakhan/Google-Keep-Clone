import React, { memo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Search from "./../Search/Search";
import { AiFillBook, AiOutlineMenu } from "react-icons/ai";
import { theme } from "./../../theme/theme";

const Navbar = ({ toggleSideBar, path }) => {
  const history = useHistory();
  console.log('Navbar path', path)
  let header;
  if (path === "/") {
    header = "Active";
  } else if (path === "/archive") {
    header = "Archive";
  } else {
    header = "Search"
  }

  return (
    <NavbarContainer>
      <NavbarWrapper>
        <MenuAndLogo>
          <MenuConatiner>
            <AiOutlineMenu size={"1.25rem"} onClick={toggleSideBar} />
          </MenuConatiner>
          <LogoAndTitle onClick={() => history.push("/")}>
            <AiFillBook color={theme.orange} size={"2.5rem"} />
            <Title>Keep</Title>
          </LogoAndTitle>

        </MenuAndLogo>
        <Title>{header && header}</Title>

        <Search />
      </NavbarWrapper>
    </NavbarContainer>
  );
};
export default memo(Navbar);

const NavbarContainer = styled.div`
  background: ${theme.white};
  border-bottom: 1px solid ${theme.grey};
  margin: 0.125rem 0;
  padding: 0.5rem;
  position: sticky;
  top: 0;
`;

const NavbarWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 80%;
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

const LogoAndTitle = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-left: 1rem;
`;

const Title = styled.div`
  font-size: 1.25rem;
  margin-left: 0.5rem;
`;
