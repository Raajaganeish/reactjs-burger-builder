import { delay, put } from "redux-saga/effects";
import { logOut } from "../actions";
import * as sagaActions from "./actionCreators";
import * as actions from "../actions/index";
import axios from "axios";
const API_KEY = "AIzaSyDcE5XChDwSLtdwkoslyMfFHhMhvpPDgDo";
const API_INFO = {
  register: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
  login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
};

export function* authSaga() {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expiryTime");
  yield localStorage.removeItem("userId");

  yield put(sagaActions.logOuActionSaga());
}

export function* performLogOutAfterExpiryTimeSaga(action) {
  console.clear();
  console.log(action);
  yield delay(action?.payload?.expirationTime);
  yield put(logOut());
}

export function* authAsyncSaga(action) {
  console.log("============ authAsyncSaga =========");
  yield put(actions.authSignUpInitiated());
  const postData = {
    email: action?.payload?.email,
    password: action?.payload?.password,
    returnSecureToken: true,
  };
  try {
    const response = yield axios.post(
      API_INFO[action?.payload?.type],
      postData
    );
    console.log(response.data);
    const expiryTime = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    if (action?.payload?.type === "register") {
      yield put(actions.authSignUpSuccess(response.data));
    } else {
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("expiryTime", expiryTime);
      localStorage.setItem("userId", response.data.localId);
      yield put(actions.authSignInSuccess(response.data));
      yield put(actions.checkTimerExpires(response.data.expiresIn));
      if (action?.payload?.redirectionURL !== null) {
        action?.payload?.propsHistory.push("/initiateCheckout");
      } else {
        action?.payload?.propsHistory.push("/");
      }
    }
  } catch (err) {
    console.log(err);
    if (action?.payload?.type === "register") {
      yield put(actions.authSignUpFailure(err));
    } else {
      yield put(actions.authSignInFailure(err));
    }
  }
}

export function* authCheckStatusSaga() {
  const token = localStorage.getItem("token");
  if (!token) {
    yield put(actions.logOut());
  } else {
    const expiryTime = new Date(localStorage.getItem("expiryTime"));
    const userId = localStorage.getItem("userId");
    if (expiryTime > new Date()) {
      yield put(actions.authSignInSuccess({ idToken: token, localId: userId }));
      yield put(
        actions.checkTimerExpires(
          (expiryTime.getTime() - new Date().getTime()) / 1000
        )
      );
      yield put(actions.tokenLoaded());
    } else {
      yield put(actions.logOut());
    }
  }
}
