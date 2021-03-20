import { delay, put } from "@redux-saga/core/effects";
import axiosInstance from "src/axios/axios-service";
import * as actions from "../actions/index";

export function* placeOrderAysncSaga(action) {
  yield put(actions.place_order_initiated());
  yield delay(2000);
  try {
    const response = yield axiosInstance.post(
      "/orders.json?auth=" + action?.payload?.tokenId,
      action?.payload?.postData
    );
    yield put(
      actions.place_order_success(response.data, action?.payload?.postData)
    );
  } catch (error) {
    yield put(actions.place_order_failure(error));
  }
}

export function* fecthOrderAsyncSaga(action) {
  const queryParams = `?auth=${action?.payload?.tokenId}&orderBy="userId"&equalTo="${action?.payload?.userId}"`;
  const test = yield put(actions.fetch_order_initiated());
  if (test) {
    console.log(test);
  }
  try {
    const res = yield axiosInstance.get("/orders.json" + queryParams);
    let orderList = [];
    for (const key in res.data) {
      orderList.push({
        ...res.data[key],
        UId: key,
      });
    }
    yield put(actions.fetch_order_success(orderList));
  } catch (error) {
    yield put(actions.fetch_order_failure(error));
  }
}
