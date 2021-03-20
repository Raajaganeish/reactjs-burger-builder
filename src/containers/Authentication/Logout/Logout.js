import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logOut } from "src/store/actions/index";

// class Logout extends Component {
//   componentDidMount() {
//     console.log("[Logout] componentDidMount");
//     this.props.onLogout();
//   }
//   render() {
//     console.log("[Logout] render");
//     return <Redirect to="/" />;
//   }
// }

const Logout = (props) => {
  useEffect(() => {
    props.onLogout();
  }, []);

  return <Redirect to="/" />;
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logOut()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
