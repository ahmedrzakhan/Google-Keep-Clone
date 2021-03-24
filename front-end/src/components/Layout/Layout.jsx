import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Layout = (props) => {
  const { children } = props;

  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarExpanded(!isSideBarExpanded);
  };

  return (
    <LayoutContainer>
      <LayoutHeader>
        <Navbar toggleSideBar={toggleSideBar} />
      </LayoutHeader>
      <LayoutMain>
        <Sidebar isExpanded={isSideBarExpanded} />
        <React.Fragment>{children}</React.Fragment>
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
