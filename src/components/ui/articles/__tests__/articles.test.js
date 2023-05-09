import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeContext } from "../../../../context/context";
import Articles from "../articles";
import { BrowserRouter } from "react-router-dom";
describe("Articles", () => {
  const datas = [
    {
      _id: "1",
      image: ["cover image"],
      tags: ["frontend"],
      title: "blog props",
      description: "About posting of blogs",
      owner: { profileImage: "owner's image", username: "temmy" },
      createdAt: "2021-09-01T12:00:00Z",
      reading_time: "2",
    },
  ];

  it("renders the component with the correct title", () => {
    render(
      <ThemeContext.Provider value={{ darkTheme: false }}>
        <BrowserRouter>
          <Articles
            datas={datas}
            title="Latest Blogs"
            username="username"
            viewerId="1"
            userId="1"
            profileImage="path/image.jpg"
          />
        </BrowserRouter>
      </ThemeContext.Provider>
    );
    const title = screen.getByText("Latest Blogs");
    expect(title).toBeInTheDocument();
  });

  it("renders the component with the correct data", () => {
    render(
      <ThemeContext.Provider value={{ darkTheme: false }}>
        <BrowserRouter>
          <Articles
            datas={datas}
            title="Latest Blogs"
            username="username"
            viewerId="1"
            userId="1"
            profileImage="path/image.jpg"
          />
        </BrowserRouter>
      </ThemeContext.Provider>
    );
    const articleTitles = screen.getAllByTestId("title");
    expect(articleTitles).toHaveLength(1);
    expect(articleTitles[0]).toHaveTextContent("blog props");
  });
});
