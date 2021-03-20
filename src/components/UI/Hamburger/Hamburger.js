import React from "react";
import hamburgerLogo from "../../../assets/images/hamburger.png";
import classes from "./Hamburger.module.css";
const Hamburger = (props) => {
  return (
    <div>
      <img
        src={hamburgerLogo}
        alt="hamburger"
        className={classes.Hamburger}
        onClick={
          props.isLinkClickable ? props.sideDrawerTogglehandler : () => {}
        }
      />
    </div>
  );
};

export default Hamburger;
