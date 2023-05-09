import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import ProfileBlogs from "../ProfileBlogs";
import formartDate from "../../../../../logic/formartDate";

const blogProps = {
  darkTheme: true,
  username: "temmy",
  profileImage: "",
  data: {
    _id: "1",
    image: ["cover image"],
    tags: ["frontend"],
    title: "blog props",
    description: "About posting of blogs",

    createdAt: "2021-09-01T12:00:00Z",
    reading_time: "2",
  },
};
jest.mock("../../../../../logic/formartDate");
test("should render cover image", () => {
  render(
    <BrowserRouter>
      <ProfileBlogs {...blogProps} />
    </BrowserRouter>
  );

  // for tags
  const tags = screen.getAllByTestId("tag-id");
  // expectation
  tags.forEach((tag, i) =>
    expect(tag.textContent).toMatch(blogProps.data.tags[i])
  );

  // for image
  const image = screen.getByAltText("blog");
  // expectation
  expect(image.getAttribute("src")).toMatch(blogProps.data.image[0]);

  // for link
  const link = screen.getByRole("link", {
    name: "Edit",
  });
  // expectation
  expect(link.getAttribute("href")).toMatch(`/edit-blog/${blogProps.data._id}`);

  // view link

  const viewLink = screen.getByRole("link", {
    name: "View Post",
  });
  // expectation
  expect(viewLink.getAttribute("href")).toMatch(`/blogs/${blogProps.data._id}`);
  // for title

  const titleText = screen.getByTestId("title");

  // expectation
  expect(titleText.textContent).toMatch(blogProps.data.title);

  // poster image
  const posterImage = screen.getByAltText("user");

  expect(posterImage.getAttribute("src")).toMatch(blogProps.profileImage);

  //reading time
  const readingTime = screen.getByTestId("reading-time");
  expect(readingTime.textContent).toMatch(
    blogProps.data.reading_time + " min read"
  );
});

test("should call formartDate function and render formatted date", () => {
  // Set up mock implementation for formartDate function
  formartDate.mockReturnValue("September 1st, 2021");

  // Render the component
  render(
    <BrowserRouter>
      <ProfileBlogs {...blogProps} />
    </BrowserRouter>
  );

  // Expect formartDate to be called with the correct argument
  expect(formartDate).toHaveBeenCalledWith("2021-09-01T12:00:00Z");

  // Expect the rendered date value to match the expected value
  const dateElement = screen.getByTestId("date");
  expect(dateElement.textContent).toEqual("September 1st, 2021");
});
