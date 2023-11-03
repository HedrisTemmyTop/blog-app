import React from "react";
import { Navigate } from "react-router-dom";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const token: string = localStorage.getItem("token")!;

  if (!token) return <Navigate to="/sign-in" />;
  return <React.Fragment>{children}</React.Fragment>;
};

export default Auth;
