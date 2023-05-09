import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import SignUpForm from "../SignUpForm";

const signUpProps = {
  submitFormHandler: jest.fn(),
  setEmail: jest.fn(),
  setFirstName: jest.fn(),
  setLastName: jest.fn(),
  setUserName: jest.fn(),
  setPassword: jest.fn(),
  setConfirmPassword: jest.fn(),
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  confirmPassword: "",
  password: "",
  loading: false,
};

describe("SignUpForm", () => {
  test("should render input fields", () => {
    render(
      <BrowserRouter>
        <SignUpForm {...signUpProps} />
      </BrowserRouter>
    );

    const firstnameInput = screen.getByPlaceholderText("First Name");
    const lastnameInput = screen.getByPlaceholderText("Last Name");
    const usernameInput = screen.getByPlaceholderText("Username");
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm password");

    expect(firstnameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  test("should submit form with valid input values", () => {
    render(
      <BrowserRouter>
        <SignUpForm {...signUpProps} />
      </BrowserRouter>
    );

    const firstnameInput = screen.getByPlaceholderText("First Name");
    const lastnameInput = screen.getByPlaceholderText("Last Name");
    const usernameInput = screen.getByPlaceholderText("Username");
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm password");

    fireEvent.change(firstnameInput, { target: { value: "John" } });
    fireEvent.change(lastnameInput, { target: { value: "Doe" } });
    fireEvent.change(usernameInput, { target: { value: "johndoe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Sign up" });
    fireEvent.click(submitButton);

    expect(signUpProps.submitFormHandler).toHaveBeenCalled();
  });
});
