import React,{ memo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Search from "./../Search/Search";
import { AiFillBook, AiOutlineMenu } from "react-icons/ai";
import { theme } from "./../../theme/theme";

const Navbar = (props) => {
  const { toggleSideBar } = props;
  const history = useHistory();

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
        <Search />
      </NavbarWrapper>
    </NavbarContainer>
  );
};
export default memo(Navbar);

const NavbarContainer = styled.div`
  background: ${theme.white};
  border-bottom: 1px solid ${theme.grey};
  left: 0;
  margin: 0.125rem 0;
  padding: 0.5rem;
`;

const NavbarWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 70%;
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
