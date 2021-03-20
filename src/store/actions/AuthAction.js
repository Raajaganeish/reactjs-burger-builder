import axios from "axios";
import * as actionTypes from "./actionTypes";

const API_KEY = "AIzaSyDcE5XChDwSLtdwkoslyMfFHhMhvpPDgDo";
const API_INFO = {
  register: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
  login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
};
export const authSignUpInitiated = () => {
  return {
    type: actionTypes.AUTH_SIGN_UP_INITIATED,
  };
};

export const authSignUpSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SIGN_UP_SUCCESS,
    payload: {
      data,
    },
  };
};
export const authSignUpFailure = (err) => {
  console.log(err);
  return {
    type: actionTypes.AUTH_SIGN_UP_FAILURE,
    payload: {
      error: err,
    },
  };
};

export const authSignInSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SIGN_IN_SUCCESS,
    payload: {
      tokenId: data.idToken,
      userId: data.localId,
    },
  };
};
export const authSignInFailure = (err) => {
  console.log(err);
  return {
    type: actionTypes.AUTH_SIGN_IN_FAILURE,
    payload: {
      error: err,
    },
  };
};
export const logOut = () => {
  /*
   for thunk
  */

  // localStorage.removeItem("token");
  // localStorage.removeItem("expiryTime");
  // localStorage.removeItem("userId");

  // return {
  //   type: actionTypes.AUTH_SIGN_OUT,
  //   payload: {
  //     tokenId: null,
  //     userId: null,
  //   },
  // };

  // for Saga

  return {
    type: actionTypes.SAGA_AUTH_SIGN_OUT_INITIATE,
  };
};
export const checkTimerExpires = (time) => {
  // for thunk
  // return (dispatch) => {
  //   setTimeout(() => {
  //     dispatch(logOut());
  //   }, time * 1000);
  // };

  // for saga

  return {
    type: actionTypes.SAGA_PERFORM_AUTH_SIGN_OUT,
    payload: {
      expirationTime: time * 1000,
    },
  };
};

export const authAsync = (
  email,
  password,
  type,
  propsHistory,
  redirectionURL
) => {
  //saga
  return {
    type: actionTypes.SAGA_PERFORM_AUTH_SIGN_IN_AYSNC,
    payload: {
      email,
      password,
      type,
      propsHistory,
      redirectionURL,
    },
  };

  // Thunk

  // return (dispatch, getState) => {
  //   console.log("============ getState() =========");
  //   console.log(getState());
  //   dispatch(authSignUpInitiated());
  //   const postData = {
  //     email,
  //     password,
  //     returnSecureToken: true,
  //   };
  //   setTimeout(() => {
  //     axios
  //       .post(API_INFO[type], postData)
  //       .then((response) => {
  //         console.log(response.data);
  //         const expiryTime = new Date(
  //           new Date().getTime() + response.data.expiresIn * 1000
  //         );
  //         if (type === "register") {
  //           dispatch(authSignUpSuccess(response.data));
  //         } else {
  //           localStorage.setItem("token", response.data.idToken);
  //           localStorage.setItem("expiryTime", expiryTime);
  //           localStorage.setItem("userId", response.data.localId);
  //           dispatch(authSignInSuccess(response.data));
  //           dispatch(checkTimerExpires(response.data.expiresIn));
  //           if (redirectionURL !== null) {
  //             propsHistory.push("/initiateCheckout");
  //           } else {
  //             propsHistory.push("/");
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         if (type === "register") {
  //           dispatch(authSignUpFailure(err));
  //         } else {
  //           dispatch(authSignInFailure(err));
  //         }
  //       });
  //   }, 2000);
  // };
};

export const tokenLoaded = () => {
  return {
    type: actionTypes.AUTH_TOKEN_LOADED_ON_APP_START,
  };
};

export const authCheckStatus = () => {
  // saga

  return {
    type: actionTypes.SAGA_PERFORM_AUTO_SIGIN_CHECK,
  };

  //thunk

  // return (dispatch) => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     dispatch(logOut());
  //   } else {
  //     const expiryTime = new Date(localStorage.getItem("expiryTime"));
  //     const userId = localStorage.getItem("userId");
  //     if (expiryTime > new Date()) {
  //       dispatch(authSignInSuccess({ idToken: token, localId: userId }));
  //       dispatch(
  //         checkTimerExpires(
  //           (expiryTime.getTime() - new Date().getTime()) / 1000
  //         )
  //       );
  //       dispatch(tokenLoaded());
  //     } else {
  //       dispatch(logOut());
  //     }
  //   }
  // };
};
