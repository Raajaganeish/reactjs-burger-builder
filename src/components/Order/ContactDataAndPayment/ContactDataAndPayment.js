import React, { Component } from "react";
import Button from "src/components/UI/Button/Button";
import classes from "./ContactDataAndPayment.module.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
// import axiosInstance from "src/axios/axios-service";
import { Spinner } from "src/components/UI/Spinner/Spinner";
import validator from "validator";
import Input from "src/components/UI/Input/Input";
import { connect } from "react-redux";
import { place_order_async } from "src/store/actions/index";
import { Redirect } from "react-router-dom";
class ContactDataAndPayment extends Component {
  state = {
    orderDetailForm: [
      {
        field: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your Name",
            name: "name",
            value: "",
          },
          validator: {
            isValid: false,
            rules: {
              required: true,
            },
          },
          touched: false,
        },
      },
      {
        field: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Your Email",
            name: "email",
            value: "",
          },
          validator: {
            isValid: false,
            rules: {
              required: true,
            },
          },
          touched: false,
        },
      },
      {
        field: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your Street",
            name: "street",
            value: "",
          },
          validator: {
            isValid: false,
            rules: {
              required: true,
            },
          },
          touched: false,
        },
      },
      {
        field: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your Zipcode",
            maxLength: "6",
            name: "zipcode",
            value: "",
          },
          validator: {
            isValid: false,
            rules: {
              required: true,
              minLength: 6,
              maxLength: 6,
            },
          },
          touched: false,
        },
      },
      {
        field: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your Country",
            name: "country",
            value: "",
          },
          validator: {
            isValid: false,
            rules: {
              required: true,
            },
          },
          touched: false,
        },
      },
      {
        field: {
          elementType: "select",
          elementConfig: {
            options: [
              { value: "SP2D", displayValue: "2 Day Delivery" },
              { value: "SP5D", displayValue: "Free 5 Day Delivery" },
            ],
            name: "deliveryMethod",
            value: "SP2D",
          },
          validator: {
            isValid: true,
            rules: {
              required: true,
            },
          },
        },
      },
    ],
    isFormValid: false,
    card: {
      cvc: "",
      expiry: "",
      focus: null,
      name: "",
      cardNumber: "",
    },
  };
  componentDidMount() {}

  checkValidationByRules = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  onInputChangeHandler = (event) => {
    console.log(event.target.name);
    const { name, value } = event.target;
    this.setState(
      (pState, props) => {
        return {
          ...pState,
          card: {
            ...pState.card,
            [name]: value,
          },
        };
      },
      () => console.log(this.state)
    );
  };

  onFocusChangeHandler = (event) => {
    this.setState(
      (pState, props) => {
        return {
          ...pState,
          card: {
            ...pState.card,
            focus: event.target.name,
          },
        };
      },
      () => console.log(this.state)
    );
  };

  onContactInputChangeHandler = (event, index) => {
    this.setState(
      (pState, props) => {
        let previousStateData = { ...pState };
        previousStateData.orderDetailForm[index].field.elementConfig.value =
          event.target.value;

        previousStateData.orderDetailForm[
          index
        ].field.validator.isValid = this.checkValidationByRules(
          event.target.value,
          previousStateData.orderDetailForm[index].field.validator.rules
        );

        const isFormValid = previousStateData.orderDetailForm.every(
          (item) => item?.field?.validator?.isValid
        );
        console.log(isFormValid);
        // console.log(previousStateData);
        return {
          ...previousStateData,
          isFormValid,
        };
      },
      () => console.log(this.state.orderDetailForm[index].field.validator)
    );
  };

  onFocusInputChangeHandler = (event, index) => {
    this.setState(
      (pState, props) => {
        let previousStateData = { ...pState };
        if (previousStateData.orderDetailForm[index].field.touched !== null) {
          previousStateData.orderDetailForm[index].field.touched = true;
        }
        return {
          ...previousStateData,
        };
      },
      () => console.log(this.state)
    );
  };

  validateCreditCard = (event) => {
    console.log(event);
    event.preventDefault();
    console.log();
    if (!validator.isCreditCard(this.state.card.cardNumber)) {
      this.onOrderSubmitHandler(event);
    }
  };
  onOrderSubmitHandler = (event) => {
    console.log(this.props);
    this.setState({ loading: true });
    let contactData = {};
    this.state.orderDetailForm.forEach(
      (eachField) =>
        (contactData[eachField.field.elementConfig.name] =
          eachField.field.elementConfig.value)
    );
    console.log(contactData);
    const postObjData = {
      ingredient: this.props.burgerIngredient,
      price: this.props.totalPrice,
      ...contactData,
      cardNumber: this.state.card.cardNumber,
    };
    console.log(postObjData);

    // axiosInstance
    //   .post("/orders.json", postObjData)
    //   .then((response) => {
    //     console.log("===========>");
    //     console.log(response.data);
    //     this.props.history.push("/myOrders");
    //   })
    //   .catch((err) => console.log(err));

    this.props.onSubmitOrder(
      postObjData,
      this.props.tokenId,
      this.props.userId
    );
  };
  render() {
    let form = null;
    let redirectionToHome = this.props.isOrderPlacedSuccessfully ? (
      <Redirect to="/" />
    ) : null;
    if (this.props.loading) {
      form = <Spinner />;
    } else {
      form = (
        <form>
          {this.state.orderDetailForm.map((eachField, id) => {
            return (
              <Input
                key={id}
                elementType={eachField.field.elementType}
                {...eachField.field.elementConfig}
                onChange={(e) => this.onContactInputChangeHandler(e, id)}
                isValid={eachField.field.validator.isValid}
                touched={eachField.field.touched}
                onFocus={(e) => this.onFocusInputChangeHandler(e, id)}
              />
            );
          })}
          <br />
          <Cards
            cvc={this.state.card.cvc}
            expiry={this.state.card.expiry}
            focused={this.state.card.focus}
            name={this.state.card.name}
            number={this.state.card.cardNumber}
          />
          <Input
            elementType="text"
            name="name"
            placeholder="Card Holder Name"
            value={this.state.card.name}
            onChange={this.onInputChangeHandler}
            onFocus={this.onFocusChangeHandler}
            pattern="[a-zA-Z]*"
            isValid={true}
          />
          <Input
            elementType="number"
            name="cardNumber"
            placeholder="Card Number"
            value={this.state.card.cardNumber}
            onChange={this.onInputChangeHandler}
            onFocus={this.onFocusChangeHandler}
            pattern="[0-9]*"
            maxLength="16"
            isValid={validator.isCreditCard(this.state.card.cardNumber)}
          />
          <Input
            elementType="text"
            name="expiry"
            placeholder="MM/YY Expiry"
            value={this.state.card.expiry}
            onChange={this.onInputChangeHandler}
            onFocus={this.onFocusChangeHandler}
            maxLength="4"
            isValid={true}
          />
          <Input
            elementType="password"
            name="cvc"
            placeholder="CVC"
            value={this.state.card.cvc}
            onChange={this.onInputChangeHandler}
            onFocus={this.onFocusChangeHandler}
            maxLength="3"
            isValid={this.state.card.cvc.length === 3}
          />
          <br />
          <Button
            btntype="Success"
            disabled={this.state.isFormValid}
            clickListener={this.validateCreditCard}
          >
            Submit
          </Button>
        </form>
      );
    }
    return (
      <div className={classes.ContactData}>
        {redirectionToHome}
        <p>Fill up Your Details!</p>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    burgerIngredient: state.burgerReducer.ingredient,
    totalPrice: state.burgerReducer.totalPrice,
    loading: state.orderReducer.loading,
    isOrderPlacedSuccessfully: state.orderReducer.isOrderPlacedSuccessfully,
    tokenId: state.authReducer.tokenId,
    userId: state.authReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitOrder: (postData, tokenId, userId) =>
      dispatch(place_order_async(postData, tokenId, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDataAndPayment);
