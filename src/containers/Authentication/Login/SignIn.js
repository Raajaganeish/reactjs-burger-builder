import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "src/components/UI/Button/Button";
import Input from "src/components/UI/Input/Input";
import classes from "./SignIn.module.css";
import * as actionCreator from "../../../store/actions/index";
import { Spinner } from "src/components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
const SignIn = (props) => {
  const [isFormValid, setFormValid] = useState(false);
  const [formControls, setFormControls] = useState({
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
  });
  // componentDidMount() {
  //   console.warn("[SignIn] componentDidMount");
  //   console.log(this.props);
  // }
  // componentDidUpdate() {
  //   console.warn("[SignIn] componentDidUpdate");
  // }
  const checkValidationByRules = (value, rules) => {
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

  const onContactInputChangeHandler = (event, index) => {
    setFormControls((pState) => {
      let previousStateData = { ...pState };
      previousStateData.controls[index].field.elementConfig.value =
        event.target.value;

      previousStateData.controls[
        index
      ].field.validator.isValid = checkValidationByRules(
        event.target.value,
        previousStateData.controls[index].field.validator.rules
      );

      // const isFormValid = previousStateData.controls.every(
      //   (item) => item?.field?.validator?.isValid
      // );
      // console.log(isFormValid);
      // console.log(previousStateData);
      return {
        ...previousStateData,
      };
    });

    const formValidity = formControls.controls.every(
      (eachControl) => eachControl?.field?.validator?.isValid
    );
    // console.log("asdasd", formValidity);
    setFormValid(formValidity);
  };

  const onFocusInputChangeHandler = (event, index) => {
    setFormControls((pState) => {
      let previousStateData = { ...pState };
      if (previousStateData.controls[index].field.touched !== null) {
        previousStateData.controls[index].field.touched = true;
      }
      return {
        ...previousStateData,
      };
    });
  };

  const onSignInSubmitHandler = (event) => {
    event.preventDefault();
    const searchParams = new URLSearchParams(props.history.location.search);
    const redirectionURL = searchParams.get("toinitiateCheckout")
      ? searchParams.get("toinitiateCheckout")
      : null;
    props.onSignInFormSubmit(
      formControls.controls[0].field.elementConfig.value,
      formControls.controls[1].field.elementConfig.value,
      props.history,
      redirectionURL
    );
  };

  let form =
    formControls && formControls.controls
      ? formControls.controls.map((eachField, id) => {
          return (
            <Input
              key={id}
              elementType={eachField.field.elementType}
              {...eachField.field.elementConfig}
              onChange={(e) => onContactInputChangeHandler(e, id)}
              isValid={eachField.field.validator.isValid}
              touched={eachField.field.touched}
              onFocus={(e) => onFocusInputChangeHandler(e, id)}
            />
          );
        })
      : null;
  return (
    <div className={classes.SignInForm}>
      {props.loading ? (
        <Spinner />
      ) : (
        <form>
          {form}
          <br />
          <Button
            btntype="Danger"
            disabled={isFormValid}
            clickListener={onSignInSubmitHandler}
          >
            LOG-IN
          </Button>
        </form>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state,
    loading: state.authReducer.loading,
    tokenId: state.authReducer.tokenId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSignInFormSubmit: (email, password, propsHistory, redirectionURL) =>
      dispatch(
        actionCreator.authAsync(
          email,
          password,
          "login",
          propsHistory,
          redirectionURL
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
