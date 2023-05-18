import { ToastContainer } from "react-toastify";

const AlertMessage = ({ duration }: { duration: number }) => {
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
        top: "0",
        width: "100%",
        maxWidth: "50rem",
        padding: "1px",
      }}
    />
  );
};

export default AlertMessage;
