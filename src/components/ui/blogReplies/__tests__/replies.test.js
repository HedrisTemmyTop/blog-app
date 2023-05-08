import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Replies from "../replies";
import { BrowserRouter } from "react-router-dom";
import formartDate from "../../../../logic/formartDate";
import defaultImage from "../../../../assets/default_img.jpeg";
const replyProps = {
  comment: [
    {
      _id: 1,
      createdAt: "2023-05-07T00:34:33.014Z",
      content: "the comment",
      author: {
        _id: 1,
        profileImage: "my image",
        username: "Temmy",
      },
    },
    {
      _id: 2,
      createdAt: "2023-05-07T00:34:33.014Z",
      content: "the comment",
      author: {
        _id: 2,
        profileImage: "my image",
        username: "Temmy",
      },
    },
    {
      _id: 3,
      createdAt: "2023-05-07T00:34:33.014Z",
      content: "the comment",
      author: {
        _id: 3,
        profileImage: "my image",
        username: "Temmy",
      },
    },
    {
      _id: 4,
      createdAt: "2023-05-07T00:34:33.014Z",
      content: "the comment",
      author: {
        _id: 4,
        profileImage: "my image",
        username: "Temmy",
      },
    },
  ],
  darkTheme: true,
};

describe("should test for themes", () => {
  test("should give a dark theme colors ", () => {
    const lightThemeProps = {
      ...replyProps,
      darkTheme: false,
    };
    render(
      <BrowserRouter>
        <Replies {...lightThemeProps} />
      </BrowserRouter>
    );
    // selections and variables
    const buttonEl = screen.getAllByRole("button");
    const authors = screen.getAllByTestId("author-username");
    const texts = screen.getAllByTestId("text-content");
    const dates = screen.getAllByTestId("date");
    const colorGrey = { color: "#999999" };

    // expectations
    dates.forEach((date) => expect(date).toHaveStyle(colorGrey));
    texts.forEach((text) => expect(text).toHaveStyle(colorGrey));
    authors.forEach((author) =>
      expect(author).toHaveStyle({
        color: "#1e1e1e",
      })
    );
    buttonEl.forEach((button) => expect(button).toHaveStyle(colorGrey));
  });
  test("should give a dark theme colors and styles", () => {
    render(
      <BrowserRouter>
        <Replies {...replyProps} />
      </BrowserRouter>
    );

    // varibles
    const buttonEl = screen.getAllByRole("button");
    const authors = screen.getAllByTestId("author-username");
    const texts = screen.getAllByTestId("text-content");
    const dates = screen.getAllByTestId("date");
    const colorGrey = { color: "#999999" };

    //expectationss

    dates.forEach((date) => expect(date).not.toHaveStyle(colorGrey));
    texts.forEach((text) => expect(text).not.toHaveStyle(colorGrey));
    authors.forEach((author) =>
      expect(author).not.toHaveStyle({ color: "#1e1e1e" })
    );

    buttonEl.forEach((button) => expect(button).not.toHaveStyle(colorGrey));
  });
});

describe("should render all datas", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Replies {...replyProps} />
      </BrowserRouter>
    );
  });

  test("should render number of comments", () => {
    // should render length of comments

    const textEl = screen.getByTestId("comment-total");

    // button should have color black
    const buttonEl = screen.getAllByRole("button");
    buttonEl.forEach((button) =>
      expect(button).not.toHaveStyle({ color: "#999999" })
    );

    expect(textEl.textContent).toBe(`Comments(${replyProps.comment.length})`);
  });

  test("should render only 2 comments at first", () => {
    // initially should render only 2 comments
    const comments = screen.getAllByTestId("comment");
    expect(comments.length).toEqual(2);

    // initially the hide  button is view all
    const hideBtnText = screen.getByText(/view all/i);
    expect(hideBtnText.textContent).toBe("View All");

    //should render usernames, profile image, content and link

    // for conetnt
    const textContent = screen.getAllByTestId("text-content");
    expect(textContent.length).toEqual(2);
    textContent.forEach((text, i) =>
      expect(text.textContent).toBe(replyProps.comment[i].content)
    );

    // for image
    const imageEl = screen.getAllByAltText("poster");

    expect(imageEl.length).toBe(2);
    imageEl.forEach((image, i) =>
      expect(image.getAttribute("src")).toBe(
        replyProps.comment[i].author.profileImage
      )
    );

    // for username
    const usernameText = screen.getAllByTestId("author-username");

    expect(usernameText.length).toEqual(2);
    usernameText.forEach((username, i) =>
      expect(username.textContent).toBe(replyProps.comment[i].author.username)
    );

    // for links
    const links = screen.getAllByRole("link");
    expect(links.length).toEqual(2);

    links.forEach((link, i) =>
      expect(link.getAttribute("href")).toBe(
        "/profile/" + replyProps.comment[i].author._id
      )
    );

    // for dates
    const dates = screen.getAllByTestId("date");

    expect(dates.length).toEqual(2);

    dates.forEach((date, i) => {
      const formatDate = formartDate(replyProps.comment[i].createdAt, "days");

      expect(date.textContent).toBe(formatDate);
    });
  });

  test("should toggle view all and show less", () => {
    const hideBtnText = screen.getByText(/view all/i);

    fireEvent.click(hideBtnText);

    const comments = screen.getAllByTestId("comment");
    expect(comments.length).toEqual(replyProps.comment.length);
    expect(hideBtnText.textContent).toBe("Show Less");

    //should render usernames, profile image, content and link

    // for conetnt
    const textContent = screen.getAllByTestId("text-content");
    expect(textContent.length).toEqual(replyProps.comment.length);
    textContent.forEach((text, i) =>
      expect(text.textContent).toBe(replyProps.comment[i].content)
    );

    // for image
    const imageEl = screen.getAllByAltText("poster");

    expect(imageEl.length).toBe(replyProps.comment.length);
    imageEl.forEach((image, i) =>
      expect(image.getAttribute("src")).toBe(
        replyProps.comment[i].author.profileImage
      )
    );

    // for username
    const usernameText = screen.getAllByTestId("author-username");

    expect(usernameText.length).toEqual(replyProps.comment.length);
    usernameText.forEach((username, i) =>
      expect(username.textContent).toBe(replyProps.comment[i].author.username)
    );

    // for links
    const links = screen.getAllByRole("link");
    expect(links.length).toEqual(replyProps.comment.length);

    links.forEach((link, i) =>
      expect(link.getAttribute("href")).toBe(
        "/profile/" + replyProps.comment[i].author._id
      )
    );

    // for dates
    const dates = screen.getAllByTestId("date");

    expect(dates.length).toEqual(replyProps.comment.length);

    dates.forEach((date, i) => {
      const formatDate = formartDate(replyProps.comment[i].createdAt, "days");

      expect(date.textContent).toBe(formatDate);
    });
  });
});

test("should render default image if no image is present for the author", () => {
  const noProfileImage = {
    ...replyProps,
    comment: [
      {
        _id: 1,
        createdAt: "2023-05-07T00:34:33.014Z",
        content: "the comment",
        author: {
          _id: 1,
          profileImage: "",
          username: "Temmy",
        },
      },
    ],
  };

  render(
    <BrowserRouter>
      <Replies {...noProfileImage} />
    </BrowserRouter>
  );

  const image = screen.getByAltText("poster");

  expect(image.getAttribute("src")).toBe(defaultImage);
});
