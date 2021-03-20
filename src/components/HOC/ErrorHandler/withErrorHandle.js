import React, { Component, useEffect, useState } from "react";
import Aux from "src/auxillary/auxillary";
import Modal from "src/components/UI/Modal/Modal";
import useHttpCustomHook from "../../../hooks/HttpCustomHook/http-customHook";
const withErrorHandle = (WrappedComponent, axios) => {
  return (props) => {
    const [httpError, setHttpErrorHandler] = useHttpCustomHook(axios);

    return (
      <Aux>
        <Modal show={httpError} modalClosed={setHttpErrorHandler}>
          {httpError ? httpError : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandle;
