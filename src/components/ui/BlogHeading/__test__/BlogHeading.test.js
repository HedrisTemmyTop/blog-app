import { screen, render, fireEvent } from "@testing-library/react";
import BlogHeading from "../BlogHeading";
import "@testing-library/jest-dom";
const mockDelete = jest.fn();
const mockPublish = jest.fn();
const state = {
  title: "Testing",
  state: "published",
  isLoading: false,
  deleteHandler: mockDelete,
  publishHandler: mockPublish,
  owner: {
    _id: "1",
  },
  userId: "1",
  darkTheme: true,
  isDeleting: false,
};
test("should style with darkTheme", () => {
  render(<BlogHeading {...state} />);

  const titleText = screen.getByText(state.title);
  expect(titleText).not.toHaveStyle({ color: "#1e1e1e" });
});

test("should style with light", () => {
  const lightThemeProps = {
    ...state,
    darkTheme: false,
  };
  render(<BlogHeading {...lightThemeProps} />);

  const titleText = screen.getByText(state.title);
  expect(titleText).toHaveStyle({ color: "#1e1e1e" });
});

test("should render title", () => {
  render(<BlogHeading {...state} />);

  const titleText = screen.getByText(state.title);
  expect(titleText).toBeInTheDocument();
});

describe("should test for a published blog", () => {
  const publishedState = {
    ...state,
    isLoading: null,
  };

  test("should render delete button since the blog is published", () => {
    render(<BlogHeading {...publishedState} />);

    const deleteText = screen.getByText(/delete/i);

    expect(deleteText).toBeInTheDocument();
    fireEvent.click(deleteText);

    expect(state.deleteHandler).toBeCalled();
    expect(state.publishHandler).not.toBeCalled();
  });

  test("should render  processing...", () => {
    const loadingProps = {
      ...publishedState,
      isDeleting: true,
    };

    render(<BlogHeading {...loadingProps} />);
    const processingText = screen.getByText(/processing .../i);

    expect(processingText).toBeInTheDocument();
    fireEvent.click(processingText);
    expect(state.deleteHandler).not.toBeCalled();
    expect(state.publishHandler).not.toBeCalled();
  });
});

describe("should test for a draft state", () => {
  const publishedState = {
    ...state,
    state: "draft",
  };

  test("should render publish button since the blog is drafted", () => {
    render(<BlogHeading {...publishedState} />);

    const publishText = screen.getByText(/publish/i);

    expect(publishText).toBeInTheDocument();

    fireEvent.click(publishText);

    expect(state.deleteHandler).not.toBeCalled();
    expect(state.publishHandler).toBeCalled();
  });

  test("should render processing...", () => {
    const loadingProps = {
      ...publishedState,
      isLoading: true,
    };

    render(<BlogHeading {...loadingProps} />);
    const processingText = screen.getByText(/processing .../i);

    expect(processingText).toBeInTheDocument();
    fireEvent.click(processingText);
    expect(state.publishHandler).not.toBeCalled();
    expect(state.deleteHandler).not.toBeCalled();
  });
});

test("should not render any button if it's not owner viewing the page", () => {
  const notUser = {
    ...state,
    userId: "1",
    owner: {
      _id: "2",
    },
  };
  render(<BlogHeading {...notUser} />);
  const buttonEl = screen.queryByRole("button");
  expect(buttonEl).not.toBeInTheDocument();
});

// checkout integration testing
