import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  const history = useHistory();

  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);

  const pathname = history.location.pathname;

  const toggleSideBar = useCallback(
    () => setIsSideBarExpanded(!isSideBarExpanded),
    [isSideBarExpanded]
  );

  return (
    <LayoutContainer>
      <Navbar toggleSideBar={toggleSideBar} />
      <LayoutMain>
        <Sidebar isExpanded={isSideBarExpanded} path={pathname} />
        <MainContent>{children}</MainContent>
      </LayoutMain>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div``;

const LayoutMain = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  margin: 3rem 5rem;
  width: 100%;
`;
