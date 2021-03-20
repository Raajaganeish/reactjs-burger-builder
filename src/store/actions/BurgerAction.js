import axiosInstance from "src/axios/axios-service";
import * as actionTypes from "./actionTypes";
import { INGREDIENT_PRICE } from "../reducers/BurgerReducer";
export const add_ingredient = (ingredientType) => {
  return { type: actionTypes.ADD_INGREDIENT, payload: { ingredientType } };
};

export const remove_ingredient = (ingredientType) => {
  return { type: actionTypes.REMOVE_INGREDIENT, payload: { ingredientType } };
};

export const calculatePrice = (data) => {
  let price = 0;
  Object.keys(data)
    .filter((x) => data[x] > 0)
    .forEach((key) => {
      price += INGREDIENT_PRICE[key];
    });
  return price;
};

export const setIngredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    payload: {
      ingredients,
      totalPrice: calculatePrice(ingredients),
    },
  };
};
export const fetchIngredientFailed = (error) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    payload: {
      error,
    },
  };
};
export const initialiseIngredient = () => {
  return {
    type: actionTypes.SAGA_FETCH_INGREDIENTS,
  };

  // return (dispatch) => {
  //   axiosInstance
  //     .get("/ingredients.json")
  //     .then((res) => {
  //       dispatch(setIngredient(res.data));
  //     })
  //     .catch((err) => dispatch(fetchIngredientFailed(err)));
  // };
};
