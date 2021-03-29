import React, { memo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Searchbar from "../../Searchbar/Searchbar";
import { AiFillBook, AiOutlineMenu } from "react-icons/ai";
import { theme } from "./../../../theme/theme";

const Navbar = ({ boxShadow, path, toggleSideBar }) => {
  const history = useHistory();
  let header;
  if (path === "/") {
    header = "Active";
  } else if (path === "/archive") {
    header = "Archive";
  } else if (path.includes("/search")) {
    header = "Search";
  }

  return (
    <NavbarContainer boxShadow={boxShadow}>
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
        <Searchbar />
      </NavbarWrapper>
    </NavbarContainer>
  );
};
export default memo(Navbar);

const NavbarContainer = styled.div`
  background: ${theme.white};
  border-bottom: 1px solid ${theme.grey};
  box-shadow: ${({ boxShadow }) =>
    boxShadow
      ? "0 1px 10px rgb(0 0 0 / 10%), 0 1px 10px rgb(0 0 0 / 7%)"
      : 0};
  margin-bottom: 0.125rem;
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
