import * as actionTypes from "../actions/actionTypes";

export const logOuActionSaga = () => {
  return {
    type: actionTypes.AUTH_SIGN_OUT,
    payload: {
      tokenId: null,
      userId: null,
    },
  };
};
