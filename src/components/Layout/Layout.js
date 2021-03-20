import React, { Component, useState } from "react";
import { connect } from "react-redux";
import Aux from "../../auxillary/auxillary";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { Toolbar } from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";

const Layout = (props) => {
  // state = {
  //   showSideDrawer: false,
  // };
  const [showSideDrawer, setshowSideDrawer] = useState(false);

  const sideDrawerDisableHandler = () => {
    // setState({
    //   showSideDrawer: false,
    // });
    setshowSideDrawer(false);
  };

  const sideDrawerTogglehandler = () => {
    // setState((pState, props) => {
    //   return {
    //     showSideDrawer: !pState.showSideDrawer,
    //   };
    // });
    setshowSideDrawer((previousState) => !previousState);
  };

  return (
    <Aux>
      <Toolbar
        sideDrawerTogglehandler={sideDrawerTogglehandler}
        isAuthenticatedUser={props.isAuthenticatedUser}
      />
      <SideDrawer
        visibleStatus={showSideDrawer}
        actionOnClick={sideDrawerDisableHandler}
        isAuthenticatedUser={props.isAuthenticatedUser}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticatedUser: state.authReducer.tokenId !== null,
  };
};
export default connect(mapStateToProps)(Layout);
