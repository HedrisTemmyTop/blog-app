import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "../../context/context";

const AlertMessage = ({ duration }) => {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <ToastContainer
      position="top-center"
      autoClose={duration}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={"light"}
      style={{
        width: "auto",
        top: "0",
        width: "100%",
        maxWidth: "50rem",
        padding: "1px",
      }}
    />
  );
};

export default AlertMessage;
