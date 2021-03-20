import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "src/components/UI/Button/Button";
import Input from "src/components/UI/Input/Input";
import classes from "./SignUp.module.css";
import * as actionCreator from "../../../store/actions/index";
class SignUp extends Component {
  state = {
    isFormValid: false,
    controls: [
      {
        field: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Your Email Address",
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
            type: "password",
            placeholder: "Your Password",
            name: "password",
            value: "",
          },
          validator: {
            isValid: false,
            rules: {
              required: true,
              maxLength: 8,
              minLength: 6,
            },
          },
          touched: false,
        },
      },
    ],
  };
  componentDidMount() {
    console.warn("[SignUp] componentDidMount");
  }
  componentDidUpdate() {
    console.warn("[SignUp] componentDidUpdate");
  }
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

  onContactInputChangeHandler = (event, index) => {
    this.setState(
      (pState, props) => {
        let previousStateData = { ...pState };
        previousStateData.controls[index].field.elementConfig.value =
          event.target.value;

        previousStateData.controls[
          index
        ].field.validator.isValid = this.checkValidationByRules(
          event.target.value,
          previousStateData.controls[index].field.validator.rules
        );

        const isFormValid = previousStateData.controls.every(
          (item) => item?.field?.validator?.isValid
        );
        console.log(isFormValid);
        // console.log(previousStateData);
        return {
          ...previousStateData,
          isFormValid,
        };
      },
      () => console.log(this.state.controls[index].field.validator)
    );
  };

  onFocusInputChangeHandler = (event, index) => {
    this.setState(
      (pState, props) => {
        let previousStateData = { ...pState };
        if (previousStateData.controls[index].field.touched !== null) {
          previousStateData.controls[index].field.touched = true;
        }
        return {
          ...previousStateData,
        };
      },
      () => console.log(this.state)
    );
  };

  onSignUpSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onSignUpFormSubmit(
      this.state.controls[0].field.elementConfig.value,
      this.state.controls[1].field.elementConfig.value
    );
  };
  render() {
    let form = this.state.controls
      ? this.state.controls.map((eachField, id) => {
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
        })
      : null;
    return (
      <div className={classes.SignUpForm}>
        <form>
          {form}
          <br />
          <Button
            btntype="Success"
            disabled={this.state.isFormValid}
            clickListener={this.onSignUpSubmitHandler}
          >
            REGISTER
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpFormSubmit: (email, password) =>
      dispatch(actionCreator.authAsync(email, password, "register")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
