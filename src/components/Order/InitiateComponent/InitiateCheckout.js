import classes from "./InitiateCheckout.module.css";
import React, { Component } from "react";
import ContactDataAndPayment from "../ContactDataAndPayment/ContactDataAndPayment";
import { connect } from "react-redux";

class InitiateComponent extends Component {
  // componentDidMount() {
  //   const searchQuery = new URLSearchParams(this.props.location.search);
  //   const ingredient = {};
  //   let totalPrice = 0;
  //   console.clear();
  //   console.log("Inside InitiateCheckout didMount");
  //   console.log(this.props);
  //   for (let param of searchQuery.entries()) {
  //     if (param[0] !== "price") {
  //       ingredient[param[0]] = +param[1];
  //     } else {
  //       totalPrice = +param[1];
  //     }
  //   }
  //   this.setState({ ingredient, totalPrice });
  // }
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
        }}
      >
        <div style={{ flexBasis: "55%" }} className={classes.UnorderedList}>
          {this.props.ings &&
            Object.keys(this.props.ings).map((x, i) => {
              return (
                <ul key={i}>
                  <span style={{ textTransform: "capitalize" }}>{x}</span> :{" "}
                  {this.props.ings[x]}
                </ul>
              );
            })}
        </div>
        <div style={{ flexBasis: "100%" }}>
          <ContactDataAndPayment
            {...this.props}
            ingredient={this.props.ing}
            totalPrice={this.props.price}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerReducer.ingredient,
    price: state.burgerReducer.totalPrice,
  };
};
export default connect(mapStateToProps)(InitiateComponent);
