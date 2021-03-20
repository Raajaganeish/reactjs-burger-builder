import React from "react";
import Aux from "src/auxillary/auxillary";
import Logo from "src/components/Logo/Logo";
import BackDrop from "src/components/UI/BackDrop/BackDrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
const SideDrawer = (props) => {
  let cssClass = [classes.SideDrawer, classes.Close];
  if (props.visibleStatus) {
    cssClass = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <BackDrop
        show={props.visibleStatus}
        backDropAction={props.actionOnClick}
      />
      <div className={cssClass.join(" ")}>
        <div className={classes.LogoForSideDrawer}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
