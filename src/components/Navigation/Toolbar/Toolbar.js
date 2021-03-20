import React, { useEffect, useState } from "react";
import Logo from "src/components/Logo/Logo";
import Hamburger from "src/components/UI/Hamburger/Hamburger";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.module.css";
export const Toolbar = (props) => {
  const [isLinkClickable, setIsLinkClickable] = useState(false);
  const updateWindowDimensions = () => {
    if (window.innerWidth <= 500) {
      setIsLinkClickable(true);
    } else {
      setIsLinkClickable(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <header className={classes.Toolbar}>
      <div className={classes.MainLink}>
        <Hamburger
          sideDrawerTogglehandler={props.sideDrawerTogglehandler}
          isLinkClickable={isLinkClickable}
        />
      </div>
      {/* <Logo /> */}
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticatedUser={props.isAuthenticatedUser} />
      </nav>
    </header>
  );
};
