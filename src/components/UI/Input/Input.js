import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];
  if (props.touched && !props.isValid) {
    inputClasses.push(classes.Invalid);
  }
  switch (props.elementType) {
    case "input":
      inputElement = <input className={inputClasses.join(" ")} {...props} />;
      break;
    case "textarea":
      inputElement = <textarea className={inputClasses.join(" ")} {...props} />;
      break;
    case "select":
      inputElement = (
        <select className={inputClasses.join(" ")} {...props}>
          {props.options.map((x, id) => {
            return (
              <option value={x.value} key={x.value}>
                {x.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = <input className={inputClasses.join(" ")} {...props} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
