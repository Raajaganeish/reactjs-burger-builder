import React from "react";
import classes from "./BuildControls.module.css";
import EachBuildControl from "./EachBuildControl/EachBuildControl";
function BuildControls(props) {
  console.log(props);
  return (
    <div className={classes.BuildControls}>
      <p>
        Total Price : <strong> {props.price.toFixed(2)} </strong>
      </p>
      {props.ingredientElements &&
        props.ingredientElements.map((eachIngredient, id) => {
          return (
            <EachBuildControl
              label={eachIngredient}
              key={eachIngredient}
              addItem={() => props.addIngredient(eachIngredient)}
              removeItem={() => props.removeIngredient(eachIngredient)}
              disableRemoveBtn={
                props.ingredientWithQuantity[eachIngredient] > 0 ? false : true
              }
            />
          );
        })}

      <button
        className={classes.OrderButton}
        disabled={!props.canBeOrdered}
        onClick={props.pruchaseHandler}
      >
        {props.isAuthenticatedUser ? "ORDER NOW!" : "SIGN IN TO ORDER"}
      </button>
    </div>
  );
}

export default BuildControls;
