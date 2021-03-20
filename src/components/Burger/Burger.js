import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
function Burger(props) {
  console.log(props);
  let keysObj =
    props.ingredient &&
    Object.keys(props.ingredient).map((x, i) =>
      [...Array(props.ingredient[x])].map((_, index) => {
        return <BurgerIngredient key={x + index} type={x} />;
      })
    );

  console.log(keysObj);
  let finalkeysObj = keysObj && keysObj.filter((x) => x.length !== 0);

  if (finalkeysObj && finalkeysObj.length === 0) {
    finalkeysObj = <p>Please start adding ingredient!!!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {finalkeysObj}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default withRouter(Burger);
