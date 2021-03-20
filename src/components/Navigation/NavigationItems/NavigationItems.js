import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticatedUser ? (
        <NavigationItem link="/myOrders">My Orders</NavigationItem>
      ) : null}
      {props.isAuthenticatedUser ? (
        <NavigationItem link="/auth/logout">LogOut</NavigationItem>
      ) : (
        <NavigationItem link="/auth/user">Sign Up</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
