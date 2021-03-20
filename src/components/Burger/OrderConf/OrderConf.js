import React from "react";
import PropTypes from "prop-types";
import Aux from "src/auxillary/auxillary";
import Button from "src/components/UI/Button/Button";
import { Spinner } from "src/components/UI/Spinner/Spinner";

const OrderConf = (props) => {
  console.log(props);
  let orderConJSX = null;
  if (!props.initiatedCheckout) {
    orderConJSX = (
      <Aux>
        <h3>Your Order</h3>
        <p>Delicious Burger with folllowing ingredient!!</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          <div style={{ flexBasis: "100%" }}>
            {props.burgerIngredient &&
              Object.keys(props.burgerIngredient).map((x, i) => {
                return (
                  <ul key={i}>
                    <span style={{ textTransform: "capitalize" }}>{x}</span> :{" "}
                    {props.burgerIngredient[x]}
                  </ul>
                );
              })}
          </div>
          <div style={{ flexBasis: "100%" }}>
            <strong>Amount: </strong>$ {props.price.toFixed(2)}
          </div>
        </div>

        <Button
          clickListener={props.cancelBtnHandler}
          btntype="Danger"
          disabled={true}
        >
          CANCEL
        </Button>
        <Button
          clickListener={props.continueBtnhandler}
          btntype="Success"
          disabled={true}
        >
          CONTINUE
        </Button>
      </Aux>
    );
  } else {
    orderConJSX = <Spinner />;
  }
  return orderConJSX;
};

OrderConf.propTypes = {
  burgerIngredient: PropTypes.object,
  price: PropTypes.number,
  cancelBtnHandler: PropTypes.func,
  continueBtnhandler: PropTypes.func,
  initiatedCheckout: PropTypes.bool,
};

export default OrderConf;
