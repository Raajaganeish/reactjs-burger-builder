import axiosInstance from "src/axios/axios-service";
import * as actionTypes from "../actions/actionTypes";

export const place_order_success = (responseData, requestData) => {
  return {
    type: actionTypes.PLACE_ORDER_SUCCESS,
    payload: {
      response: responseData,
      request: requestData,
    },
  };
};

export const place_order_failure = (error) => {
  return {
    type: actionTypes.PLACE_ORDER_FAILURE,
    payload: {
      error,
    },
  };
};

export const place_order_initiated = () => {
  return {
    type: actionTypes.PLACE_ORDER_INITIATED,
  };
};
export const place_order_async = (postData, tokenId, userId) => {
  postData["userId"] = userId;
  return {
    type: actionTypes.SAGA_PLACE_ORDER,
    payload: {
      postData,
      tokenId,
    },
  };

  // return (dispatch, getState) => {
  //   dispatch(place_order_initiated());
  //   postData["userId"] = getState()?.authReducer?.userId;
  //   setTimeout(() => {
  //     axiosInstance
  //       .post("/orders.json?auth=" + tokenId, postData)
  //       .then((response) => {
  //         console.log("===========> [place_order_async]");
  //         console.log(response.data);
  //         dispatch(place_order_success(response.data, postData));
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         dispatch(place_order_failure(err));
  //       });
  //   }, 2000);
  // };
};

export const fetch_order_success = (orderslist) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    payload: {
      orderslist,
    },
  };
};

export const fetch_order_failure = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAILURE,
    payload: {
      error,
    },
  };
};

export const fetch_order_initiated = () => {
  return {
    type: actionTypes.FETCH_ORDER_INITIATED,
  };
};
export const fecthOrderAsync = (tokenId, userId) => {
  return {
    type: actionTypes.SAGA_FETCH_ORDER,
    payload: {
      tokenId,
      userId,
    },
  };

  // return (dispatch) => {
  //   const queryParams = `?auth=${tokenId}&orderBy="userId"&equalTo="${userId}"`;
  //   dispatch(fetch_order_initiated());
  //   axiosInstance
  //     .get("/orders.json" + queryParams)
  //     .then((res) => {
  //       console.log(res);
  //       let orderList = [];
  //       for (const key in res.data) {
  //         orderList.push({
  //           ...res.data[key],
  //           UId: key,
  //         });
  //       }
  //       dispatch(fetch_order_success(orderList));
  //     })
  //     .catch((err) => dispatch(fetch_order_failure(err)));
  // };
};

export const reserOrderPlacedStatus = () => {
  return {
    type: actionTypes.RESET_ORDER_PLACED_STATUS,
  };
};
