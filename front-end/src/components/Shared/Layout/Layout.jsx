import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Sidebar from "./../Sidebar/Sidebar";
import Navbar from "./../Navbar/Navbar";

const Layout = ({ children }) => {
  const history = useHistory();

  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);
  const [boxShadow, setBoxShadow] = useState(false);

  const layoutRef = useRef(null);

  const handleScroll = () => {
    const scrollPosition =
      layoutRef.current && layoutRef.current.getBoundingClientRect().top;
    console.log("scrollPosition", scrollPosition);
    console.log("boxShadow", boxShadow);
    if (scrollPosition < 0) {
      setBoxShadow(true);
    } else {
      setBoxShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  const pathname = history.location.pathname;

  const toggleSideBar = useCallback(
    () => setIsSideBarExpanded(!isSideBarExpanded),
    [isSideBarExpanded]
  );

  return (
    <LayoutContainer ref={layoutRef}>
      <Navbar
        boxShadow={boxShadow}
        path={pathname}
        toggleSideBar={toggleSideBar}
      />
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
