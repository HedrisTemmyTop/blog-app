import React, { useState } from "react";
import AlertMessage from "../components/alertMessage/alertMessage";

const ErrorHandler = ({ children, errorMessage }) => {
  return (
    <>
      {errorMessage ? (
        <AlertMessage
          duration="5000"
          bgColor="error"
          message={errorMessage}
          cancelBtn={true}
        />
      ) : null}
      {children}
    </>
  );
};

export default ErrorHandler;
