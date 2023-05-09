import { screen, render, fireEvent } from "@testing-library/react";
import CommentInput from "../CommentInput";
import React from "react";
import "@testing-library/jest-dom";

const inputProps = {
  handleSubmit: jest.fn(),
  setCommentInput: jest.fn(),
  commenting: false,
  commentInput: "hello world",
};

test("should render sending when the comment is sending", () => {
  const sendingProps = {
    ...inputProps,
    commenting: true,
  };
  render(<CommentInput {...sendingProps} />);
  const sendingText = screen.getByText(/sending.../i);
  const commentText = screen.queryByText(/COMMENT/);

  expect(commentText).not.toBeInTheDocument();
  expect(sendingText).toBeInTheDocument();
  expect(sendingText.textContent).toBe("SENDING...");
});

test("should render comment when the comment is not sending", () => {
  render(<CommentInput {...inputProps} />);

  const commentText = screen.getByText(/COMMENT/);
  const sendingText = screen.queryByText(/sending.../i);

  expect(commentText).toBeInTheDocument();
  expect(sendingText).not.toBeInTheDocument();

  expect(commentText.textContent).toBe("COMMENT");
});

test("should change the input value of the text area", () => {
  render(<CommentInput {...inputProps} />);

  const input = screen.getByPlaceholderText("Say something...");

  fireEvent.change(input, {
    target: {
      value: "new value",
    },
  });

  expect(inputProps.setCommentInput).toBeCalled();
});

test("should test submit function", () => {
  render(<CommentInput {...inputProps} />);
  const form = screen.getByRole("form");

  fireEvent.submit(form);

  expect(inputProps.handleSubmit).toBeCalled();
});
