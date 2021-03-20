import * as actionTypes from "../actions/actionTypes";
import { takeEvery, takeLatest } from "redux-saga/effects";
import {
  authAsyncSaga,
  authCheckStatusSaga,
  authSaga,
  performLogOutAfterExpiryTimeSaga,
} from "./authSaga";
import { initialiseIngredientSaga } from "./burgerSaga";
import { fecthOrderAsyncSaga, placeOrderAysncSaga } from "./orderSaga";

export function* watcherAuthSaga() {
  yield takeEvery(actionTypes.SAGA_AUTH_SIGN_OUT_INITIATE, authSaga);
  yield takeEvery(
    actionTypes.SAGA_PERFORM_AUTH_SIGN_OUT,
    performLogOutAfterExpiryTimeSaga
  );
  yield takeLatest(actionTypes.SAGA_PERFORM_AUTH_SIGN_IN_AYSNC, authAsyncSaga);
  yield takeLatest(
    actionTypes.SAGA_FETCH_INGREDIENTS,
    initialiseIngredientSaga
  );
  yield takeLatest(
    actionTypes.SAGA_PERFORM_AUTO_SIGIN_CHECK,
    authCheckStatusSaga
  ); //
  yield takeLatest(actionTypes.SAGA_PLACE_ORDER, placeOrderAysncSaga);
  yield takeLatest(actionTypes.SAGA_FETCH_ORDER, fecthOrderAsyncSaga);
}
