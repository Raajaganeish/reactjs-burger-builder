import { call, put } from "@redux-saga/core/effects";
import axiosInstance from "src/axios/axios-service";
import * as actions from "../actions/index";

export function* initialiseIngredientSaga(action) {
  try {
    const response = yield axiosInstance.get("/ingredients.json");
    yield put(actions.setIngredient(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientFailed(error));
  }
}
