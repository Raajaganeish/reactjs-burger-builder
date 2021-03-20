import React from "react";
import Aux from "src/auxillary/auxillary";
import BackDrop from "../BackDrop/BackDrop";
import classes from "./Modal.module.css";
function Modal(props) {
  return (
    <Aux>
      <BackDrop
        show={props.show}
        backDropAction={props.backDropAction}
      ></BackDrop>
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-110vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
}

export default React.memo(Modal, (prevProps, nextProps) => {
  return (
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
  );
});
