import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeContext } from "../../../../context/context";
import Box from "../Box";

describe("Box component", () => {
  it("renders HomepageBlog component if button prop is false or userId is not equal to viewerId", () => {
    const data = {
      _id: "123",
      title: "Test blog",
      description: "This is a test blog.",
      tags: ["test"],
      image: ["https://test.com/test.jpg"],
      owner: {
        username: "testuser",
        profileImage: "https://test.com/testuser.jpg",
      },
      createdAt: "2022-01-01T00:00:00.000Z",
      reading_time: 5,
    };
    const viewerId = "456";
    render(
      <ThemeContext.Provider value={{ darkTheme: false }}>
        <BrowserRouter>
          <Box data={data} button={false} userId="789" viewerId={viewerId} />
        </BrowserRouter>
      </ThemeContext.Provider>
    );
    const blogContainer = screen.getByTestId("home-blog-container");
    expect(blogContainer).toBeInTheDocument();
  });

  it("renders ProfileBlogs component if button prop is true and userId is equal to viewerId", () => {
    const data = {
      _id: "123",
      title: "Test blog",
      description: "This is a test blog.",
      tags: ["test"],
      image: ["https://test.com/test.jpg"],
      owner: {
        username: "testuser",
        profileImage: "https://test.com/testuser.jpg",
      },
      createdAt: "2022-01-01T00:00:00.000Z",
      reading_time: 5,
    };
    render(
      <ThemeContext.Provider value={{ darkTheme: true }}>
        <BrowserRouter>
          <Box
            data={data}
            button={true}
            username="testuser"
            profileImage="https://test.com/testuser.jpg"
            userId="123"
            viewerId="123"
          />
        </BrowserRouter>
      </ThemeContext.Provider>
    );
    const blogContainer = screen.getByTestId("profile-blog-container");
    expect(blogContainer).toBeInTheDocument();
  });
});
