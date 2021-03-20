import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  isOrderPlacedSuccessfully: false,
  orderList: [],
  fetchingOrder: false,
};
export const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLACE_ORDER_INITIATED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PLACE_ORDER_SUCCESS:
      const order = {
        ...action.payload.response,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(order),
        isOrderPlacedSuccessfully: true,
      };
    case actionTypes.PLACE_ORDER_FAILURE:
      return { ...state, loading: false };

    case actionTypes.FETCH_ORDER_INITIATED:
      return {
        ...state,
        fetchingOrder: true,
      };
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        fetchingOrder: false,
        orderList: action?.payload?.orderslist,
      };
    case actionTypes.FETCH_ORDER_FAILURE:
      return {
        ...state,
        fetchingOrder: false,
      };

    case actionTypes.RESET_ORDER_PLACED_STATUS:
      return {
        ...state,
        isOrderPlacedSuccessfully: false,
        loading: false,
      };
    default:
      return state;
  }
};
