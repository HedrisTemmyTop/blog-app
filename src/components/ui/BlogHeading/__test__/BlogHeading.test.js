import { screen, render } from "@testing-library/react";
import BlogHeading from "../BlogHeading";
import "@testing-library/jest-dom";

const state = {
  title: "Testing",
  state: "published",
  isLoading: false,
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
  });

  test("should render  processing...", () => {
    const loadingProps = {
      ...publishedState,
      isDeleting: true,
    };

    render(<BlogHeading {...loadingProps} />);
    const processingText = screen.getByText(/processing .../i);

    expect(processingText).toBeInTheDocument();
  });
});

describe("should test for a draft state", () => {
  const publishedState = {
    title: "Testing",
    state: "draft",
    isLoading: false,
    owner: {
      _id: "1",
    },
    userId: "1",
    darkTheme: true,
  };
  test("should render title", () => {
    render(<BlogHeading {...publishedState} />);

    const titleText = screen.getByText(publishedState.title);
    expect(titleText).toBeInTheDocument();
  });

  test("should render delete button since the blog is published", () => {
    render(<BlogHeading {...publishedState} />);

    const publishText = screen.getByText(/publish/i);

    expect(publishText).toBeInTheDocument();
  });

  test("should render  processing...", () => {
    const loadingProps = {
      ...publishedState,
      isLoading: true,
    };

    render(<BlogHeading {...loadingProps} />);
    const processingText = screen.getByText(/processing .../i);

    expect(processingText).toBeInTheDocument();
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
