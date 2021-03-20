import React from "react";
import classes from "./Button.module.css";
import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <button
      onClick={props.clickListener}
      disabled={!props.disabled}
      className={[classes.Button, classes[props.btntype]].join(" ")}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  clickListener: PropTypes.func,
  btntype: PropTypes.string,
  children: PropTypes.any,
  disabled: PropTypes.bool,
};
export default Button;
