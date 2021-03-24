import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout/Layout";

const Dashboard = () => {
  const history = useHistory();
  //   console.log("history", history);
  //   console.log("pathname", history.location.pathname);
  return (
    <React.Fragment>
      <Layout>
        <DashboardContainer>
          <div>xyz</div>
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>{" "}
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>{" "}
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>{" "}
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>{" "}
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>{" "}
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>{" "}
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>{" "}
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>{" "}
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>{" "}
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>{" "}
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>{" "}
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>{" "}
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>{" "}
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>{" "}
          <div>mlm</div> <div>mlm</div> <div>mlm</div> <div>mlm</div>
        </DashboardContainer>
      </Layout>
    </React.Fragment>
  );
};

export default Dashboard;

const DashboardContainer = styled.div``;
