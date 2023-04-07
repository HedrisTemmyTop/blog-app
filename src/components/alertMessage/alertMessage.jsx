import { useEffect, useState } from "react";

const AlertMessage = ({ bgColor, message, duration, cancelBtn = false }) => {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, duration);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const bgColorBtn = () => {
    if (bgColor === "success") return "#48bb78";
    if (bgColor === "error") return "#f56565";
    if (bgColor === "warning") return "#ecc94b";
  };
  return (
    <div
      style={{
        backgroundColor: bgColorBtn(),
        color: "white",
        padding: "1rem 4rem ",
        borderRadius: "0.25rem",
        boxShadow: "0 0 1rem rgba(0, 0, 0, 0.2)",
        opacity: isOpen ? "1" : "0",
        visibility: isOpen ? "visible" : "hidden",
        transition: "opacity 0.3s ease-in-out",
        position: "fixed",
        top: "0.3rem",
        transform: "translateX(-50%)",
        left: "50%",
        display: "flex",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <span> {message}</span>
      {cancelBtn ? (
        <span
          style={{ marginLeft: "4rem", fontSize: "3rem" }}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          &times;
        </span>
      ) : null}
    </div>
  );
};

export default AlertMessage;
