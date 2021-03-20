import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "src/auxillary/auxillary";
import axiosInstance from "src/axios/axios-service";
import BuildControls from "src/components/Burger/BuildControls/BuildControls";
import Burger from "src/components/Burger/Burger";
import OrderConf from "src/components/Burger/OrderConf/OrderConf";
import withErrorHandle from "src/components/HOC/ErrorHandler/withErrorHandle";
import Modal from "src/components/UI/Modal/Modal";
import { reserOrderPlacedStatus } from "src/store/actions/OrderActions";
// import {
//   ADD_INGREDIENT,
//   REMOVE_INGREDIENT,
// } from "src/store/actions/actionTypes";
import * as BurgerBuilderActions from "../../store/actions/index";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canBeOrdered: false,
      pruchaseInitiated: false,
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.props.getIngredientFormServer();
    this.props.onResetOrderPlacedFlag();
    // axiosInstance
    //   .get("/ingredients.json")
    //   .then((res) => {
    //     this.setState({ ingredient: res.data });
    //   })
    //   .catch((err) => console.log(err));
  }

  addIngredientCountHandler = (type) => {
    console.log(type);
    const updateIngredient = { ...this.state.ingredient };
    updateIngredient[type] = this.state.ingredient[type] + 1;
    this.setState((pState, props) => {
      return {
        ingredient: updateIngredient,
        totalPrice: pState.totalPrice + INGREDIENT_PRICE[type],
      };
    });
    this.updateCanBeOrderedState();
  };

  removeIngredientCountHandler = (type) => {
    console.log(type);
    const updateIngredient = { ...this.state.ingredient };
    if (updateIngredient[type] > 0) {
      updateIngredient[type] = this.state.ingredient[type] - 1;
      this.setState((pState, props) => {
        return {
          ingredient: updateIngredient,
          totalPrice: pState.totalPrice - INGREDIENT_PRICE[type],
        };
      });

      this.updateCanBeOrderedState();
    }
  };

  updateCanBeOrderedState = () => {
    this.setState((pState, props) => {
      return {
        ...pState,
        canBeOrdered: Object.values(pState.ingredient).some((x) => x > 0),
      };
    });
  };

  checkOrderCanBePurchased = () => {
    return this.props.burgerIngredient
      ? Object.values(this.props.burgerIngredient).some((x) => x > 0)
      : null;
  };

  pruchaseBtnHandler = () => {
    if (this.props.isAuthenticatedUser)
      this.setState({ pruchaseInitiated: true });
    else this.props.history.push("/auth/user?tab=1&toinitiateCheckout=true");
  };

  backDropActionHandler = () => {
    this.setState((pState, props) => {
      return {
        ...pState,
        pruchaseInitiated: false,
      };
    });
  };

  iniateCheckoutBtnHandler = () => {
    // this.setState({ initiatedCheckout: true });
    // const postObjData = {
    //   ingredient: this.state.ingredient,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Max",
    //     address: {
    //       street: "MiidWay 36 St",
    //       zipcodde: 41234,
    //       country: "Germany",
    //     },
    //     email: "test@test.com",
    //     deliveryMethod: "Free 2 Day Shiping",
    //   },
    // };
    // console.log(postObjData);
    // axiosInstance
    //   .post("/orders.json", postObjData)
    //   .then((response) => {
    //     this.setState({ pruchaseInitiated: false, initiatedCheckout: false });
    //   })
    //   .catch((error) => {
    //     console.log("Error check in Burger Builder");
    //     this.setState({ pruchaseInitiated: false, initiatedCheckout: false });
    //   });
    const queryParams = [];
    for (let key in this.state.ingredient) {
      queryParams.push(
        encodeURIComponent(key) +
          "=" +
          encodeURIComponent(this.state.ingredient[key])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/initiateCheckout",
    //   search: queryString,
    // });

    // Using Redux state hence removed queryParams

    this.props.history.push("/initiateCheckout");
  };
  render() {
    const ingredientElements = this.props.burgerIngredient
      ? Object.keys(this.props.burgerIngredient)
      : null;
    return (
      <Aux>
        <Modal
          show={this.state.pruchaseInitiated}
          backDropAction={this.backDropActionHandler}
        >
          <OrderConf
            burgerIngredient={this.props.burgerIngredient}
            price={this.props.totalPrice}
            cancelBtnHandler={this.backDropActionHandler}
            continueBtnhandler={this.iniateCheckoutBtnHandler}
          />
        </Modal>
        <div>
          <Burger ingredient={this.props.burgerIngredient} />
        </div>
        <div>
          <BuildControls
            ingredientElements={ingredientElements}
            addIngredient={this.props.addIngredientCountHandler}
            removeIngredient={this.props.removeIngredientCountHandler}
            ingredientWithQuantity={this.props.burgerIngredient}
            price={this.props.totalPrice}
            canBeOrdered={this.checkOrderCanBePurchased()}
            pruchaseHandler={() => this.pruchaseBtnHandler()}
            isAuthenticatedUser={this.props.isAuthenticatedUser}
          />
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    burgerIngredient: state.burgerReducer.ingredient,
    totalPrice: state.burgerReducer.totalPrice,
    error: state.burgerReducer.error,
    errorMessage: state.burgerReducer.errorMessage,
    isAuthenticatedUser: state.authReducer.tokenId !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientCountHandler: (ingredientType) =>
      dispatch(BurgerBuilderActions.add_ingredient(ingredientType)),
    removeIngredientCountHandler: (ingredientType) =>
      dispatch(BurgerBuilderActions.remove_ingredient(ingredientType)),
    getIngredientFormServer: () =>
      dispatch(BurgerBuilderActions.initialiseIngredient()),

    onResetOrderPlacedFlag: () => dispatch(reserOrderPlacedStatus()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandle(BurgerBuilder, axiosInstance));
