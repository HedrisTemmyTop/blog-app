import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import SignInForm from "../SignInForm";

const signInprops = {
  submitFormHandler: jest.fn(),
  setEmail: jest.fn(),
  email: "",
  password: "",
  setPassword: jest.fn(),
  loading: false,
};

test("should render button", () => {
  render(
    <BrowserRouter>
      <SignInForm {...signInprops} />
    </BrowserRouter>
  );

  const loadingContainer = screen.queryByTestId("loading-spinner");
  const submitBtn = screen.getByRole("button");

  expect(submitBtn).toBeInTheDocument();
  expect(loadingContainer).not.toBeInTheDocument();
});

test("should test setEmail", () => {
  render(
    <BrowserRouter>
      <SignInForm {...signInprops} />
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText("Email address");
  const newValue = "new value";

  fireEvent.change(emailInput, {
    target: {
      value: newValue,
    },
  });

  expect(signInprops.setEmail).toHaveBeenCalledWith(newValue);
});

test("should call  set password", () => {
  render(
    <BrowserRouter>
      <SignInForm {...signInprops} />
    </BrowserRouter>
  );

  const passwordInput = screen.getByPlaceholderText("Password");
  const newValue = "new value";

  fireEvent.change(passwordInput, {
    target: {
      value: newValue,
    },
  });

  expect(signInprops.setPassword).toHaveBeenCalledWith(newValue);
});

test("should change the value of the password", () => {
  const passwordProps = {
    ...signInprops,
    password: "new value",
  };
  render(
    <BrowserRouter>
      <SignInForm {...passwordProps} />
    </BrowserRouter>
  );

  const passwordInput = screen.getByPlaceholderText("Password");

  expect(passwordInput.value).toEqual(passwordProps.password);
});

test("should change the value of the email", () => {
  const emailProps = {
    ...signInprops,
    email: "new value",
  };
  render(
    <BrowserRouter>
      <SignInForm {...emailProps} />
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText("Email address");

  expect(emailInput.value).toEqual(emailProps.email);
});

test("should submit input details", () => {
  render(
    <BrowserRouter>
      <SignInForm {...signInprops} />
    </BrowserRouter>
  );
  const formEl = screen.getByTestId("sign-in-form");

  fireEvent.submit(formEl);

  expect(signInprops.submitFormHandler).toBeCalled();
});

test("should render spinner", () => {
  const emailProps = {
    ...signInprops,
    loading: true,
  };
  render(
    <BrowserRouter>
      <SignInForm {...emailProps} />
    </BrowserRouter>
  );

  const loadingContainer = screen.getByTestId("loading-spinner");
  const submitBtn = screen.queryByRole("button");

  expect(submitBtn).not.toBeInTheDocument();
  expect(loadingContainer).toBeInTheDocument();
});
