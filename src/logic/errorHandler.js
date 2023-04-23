import React, { useState } from "react";
import AlertMessage from "../components/alertMessage/alertMessage";

const ErrorHandler = ({ children, errorMessage, duration = "5000" }) => {
  return (
    <>
      {errorMessage ? (
        <AlertMessage
          duration={duration}
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
