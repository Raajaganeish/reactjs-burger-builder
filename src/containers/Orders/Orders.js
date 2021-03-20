import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import axiosInstance from "src/axios/axios-service";
import Order from "src/components/Burger/OrderConf/Order/Order";
import withErrorHandle from "src/components/HOC/ErrorHandler/withErrorHandle";
import { fecthOrderAsync } from "src/store/actions/index";

const Orders = (props) => {
  // componentDidMount() {
  //   console.log("[Orders.js] ComponentDidMount");
  //   // axiosInstance
  //   //   .get("/orders.json")
  //   //   .then((res) => {
  //   //     console.log(res);
  //   //     let orderList = [];
  //   //     for (const key in res.data) {
  //   //       orderList.push({
  //   //         ...res.data[key],
  //   //         UId: key,
  //   //       });
  //   //     }
  //   //     this.setState((pState, props) => {
  //   //       return { orders: orderList, loading: false };
  //   //     });
  //   //   })
  //   //   .catch((err) => console.log(err));
  //   setTimeout(() => {
  //     this.props.onFetchOrder(this.props.tokenId, this.props.userId);
  //   }, 500);
  // }
  useEffect(() => {
    setTimeout(() => {
      props.onFetchOrder(props.tokenId, props.userId);
    }, 500);
  }, []);

  // render() {
  console.log(props);
  return (
    <div>
      {props.orders &&
        props.orders.map((eachOrder, id) => {
          let cardNumber = "";
          for (let i = 0; i < eachOrder.cardNumber.length; i++) {
            if (i % 4 === 0) {
              cardNumber += " " + eachOrder.cardNumber[i];
            } else {
              cardNumber += eachOrder.cardNumber[i];
            }
          }
          return (
            <Order
              key={eachOrder.UId}
              orderPrice={eachOrder.price}
              orderIngredient={eachOrder.ingredient}
              cardNumber={cardNumber}
            />
          );
        })}
    </div>
  );
  // }
};

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orderList,
    loading: state.orderReducer.fetchingOrder,
    tokenId: state.authReducer.tokenId,
    userId: state.authReducer.userId,
    tokenLoaded: state.authReducer.tokenLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (tokenId, userId) =>
      dispatch(fecthOrderAsync(tokenId, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandle(Orders, axiosInstance));
