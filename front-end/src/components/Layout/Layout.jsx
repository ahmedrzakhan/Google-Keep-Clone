import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Layout = (props) => {
  const { children } = props;

  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);

  const toggleSideBar = useCallback(
    () => setIsSideBarExpanded(!isSideBarExpanded),
    [isSideBarExpanded]
  );

  return (
    <LayoutContainer>
      <LayoutHeader>
        <Navbar toggleSideBar={toggleSideBar} />
      </LayoutHeader>
      <LayoutMain>
        <Sidebar isExpanded={isSideBarExpanded} />
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
const LayoutHeader = styled.div`
  position: sticky;
  top: 0;
`;

const MainContent = styled.div`
  margin: 3rem 5rem;
`;
