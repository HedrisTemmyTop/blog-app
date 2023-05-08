import BlogButton from "../Button";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

test("should render Processing", () => {
  render(<BlogButton loading={true} type="delete" />);
  const processingText = screen.getByText(/processing.../i);

  expect(processingText).toBeInTheDocument();
});

test("should render delete", () => {
  render(<BlogButton loading={false} type="delete" />);
  const deleteText = screen.getByText(/delete/i);

  expect(deleteText).toBeInTheDocument();
});
