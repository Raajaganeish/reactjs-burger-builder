import * as actionTypes from "../actions/actionTypes";
const initialState = {
  tokenId: null,
  userId: null,
  loading: false,
  error: null,
  tokenLoaded: false,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SIGN_IN_INITIATED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        tokenId: action?.payload?.tokenId,
        userId: action?.payload?.userId,
        loading: false,
        tokenLoaded: true,
      };
    case actionTypes.AUTH_SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        tokenLoaded: true,
      };
    case actionTypes.AUTH_SIGN_IN_FAILURE:
      return {
        ...state,
        error: action?.payload?.error,
        loading: false,
      };
    case actionTypes.AUTH_SIGN_UP_INITIATED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.AUTH_SIGN_OUT:
      return {
        ...state,
        tokenId: action?.payload?.tokenId,
        userId: action?.payload?.userId,
      };
    case actionTypes.AUTH_TOKEN_LOADED_ON_APP_START: {
      return {
        ...state,
        tokenLoaded: state.tokenId ? true : false,
      };
    }
    default:
      return { ...state };
  }
};
