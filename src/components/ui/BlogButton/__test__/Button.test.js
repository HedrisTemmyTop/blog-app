import BlogButton from "../Button";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const handleDelete = jest.fn();

test("should render Processing", () => {
  render(<BlogButton loading={true} type="delete" click={handleDelete} />);
  const processingText = screen.getByText(/processing.../i);

  expect(processingText).toBeInTheDocument();
});

test("should render delete", () => {
  render(<BlogButton loading={false} type="delete" click={handleDelete} />);
  const deleteText = screen.getByText(/delete/i);

  expect(deleteText).toBeInTheDocument();
});

test("should delete blog", () => {
  render(<BlogButton loading={false} type="delete" click={handleDelete} />);
  const deleteEl = screen.getByText("delete");
  fireEvent.click(deleteEl);

  expect(handleDelete).toBeCalled();
});
test("should not be able to click again when blog is processing", () => {
  render(<BlogButton loading={true} type="delete" click={handleDelete} />);
  const deleteEl = screen.getByText(/processing.../i);
  fireEvent.click(deleteEl);

  expect(handleDelete).not.toBeCalled();
});
