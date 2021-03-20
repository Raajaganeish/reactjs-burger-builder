import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import classes from "./Authentication.module.css";
import SignIn from "./Login/SignIn";
import SignUp from "./Register/SignUp";

const Authentication = (props) => {
  const searchParams = new URLSearchParams(props.history.location.search);
  let tabIndex = 0;
  if (
    searchParams.get("tab") &&
    parseInt(searchParams.get("tab")) < 2 &&
    parseInt(searchParams.get("tab")) > 0
  ) {
    tabIndex = parseInt(searchParams.get("tab"));
  }
  const [tabSelected, setTabSelected] = useState(tabIndex);

  const onChangeTabHandler = (index) => {
    setTabSelected(index);
    console.log(index);
  };
  return (
    <div className={classes.AuthTabs}>
      <Tabs
        selectedIndex={tabSelected}
        onSelect={(index) => onChangeTabHandler(index)}
      >
        <TabList>
          <Tab>SignUp</Tab>
          <Tab>SignIn</Tab>
        </TabList>
        <TabPanel>
          <SignUp />
        </TabPanel>
        <TabPanel>
          <SignIn />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default withRouter(Authentication);
