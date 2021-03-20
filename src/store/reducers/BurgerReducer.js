import * as BurgerActions from "../actions/actionTypes";

const initialState = {
  ingredient: null,
  totalPrice: 4,
  error: null,
  errorMessage: null,
};

export const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const BurgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case BurgerActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredient: {
          ...state.ingredient,
          [action.payload.ingredientType]:
            state.ingredient[action.payload.ingredientType] + 1,
        },
        totalPrice:
          state.totalPrice + INGREDIENT_PRICE[action.payload.ingredientType],
      };

    case BurgerActions.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredient: {
          ...state.ingredient,
          [action.payload.ingredientType]:
            state.ingredient[action.payload.ingredientType] - 1,
        },
        totalPrice:
          state.totalPrice - INGREDIENT_PRICE[action.payload.ingredientType],
      };

    case BurgerActions.SET_INGREDIENT:
      return {
        ...state,
        ingredient: action?.payload?.ingredients,
        error: false,
        totalPrice: initialState.totalPrice + action?.payload?.totalPrice,
      };
    case BurgerActions.FETCH_INGREDIENT_F:
      return {
        ...state,
        error: true,
        errorMessage: action?.payload?.error,
      };

    default:
      return { ...state };
  }
};

export default BurgerReducer;
