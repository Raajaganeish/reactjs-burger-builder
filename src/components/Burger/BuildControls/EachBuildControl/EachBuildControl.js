import React from "react";
import classes from "./EachBuildControl.module.css";
export default function EachBuildControl(props) {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.removeItem}
        disabled={props.disableRemoveBtn}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.addItem}>
        More
      </button>
    </div>
  );
}
