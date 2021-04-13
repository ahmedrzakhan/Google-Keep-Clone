import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Sidebar from "./../Sidebar/Sidebar";
import Navbar from "./../Navbar/Navbar";
import { background, textColor } from "./../../../theme/theme";

const Layout = ({ children }) => {
  const history = useHistory();

  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);
  const [showBoxShadow, setShowBoxShadow] = useState(false);

  const layoutRef = useRef(null);

  const handleScroll = () => {
    const scrollPosition =
      layoutRef.current && layoutRef.current.getBoundingClientRect().top;
    if (scrollPosition < 0) {
      setShowBoxShadow(true);
    } else {
      setShowBoxShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathname = history.location.pathname;

  const toggleSideBar = useCallback(
    () => setIsSideBarExpanded(!isSideBarExpanded),
    [isSideBarExpanded]
  );

  return (
    <LayoutContainer ref={layoutRef}>
      <Navbar
        boxShadow={showBoxShadow}
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

const LayoutContainer = styled.div`
  background: ${background};
  color: ${textColor};
  height: 100%;
`;

const LayoutMain = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  margin: 3rem 5rem;
  width: 100%;
`;
