import React from "react";
import classes from "./Order.module.css";
const Order = (props) => {
  let ingredient = [];
  if (props.orderIngredient) {
    for (const key in props.orderIngredient) {
      ingredient.push({ name: key, amount: props.orderIngredient[key] });
    }
  }

  const jsxIngredient = ingredient.map((x, id) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
        key={id}
      >
        {x.name.toUpperCase()} ({x.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients : {jsxIngredient} </p>
      <p>CardNumber : {props.cardNumber}</p>
      <p>
        Price :{" "}
        <strong>USD {Number.parseFloat(props.orderPrice).toFixed(3)}</strong>
      </p>
    </div>
  );
};

export default Order;
