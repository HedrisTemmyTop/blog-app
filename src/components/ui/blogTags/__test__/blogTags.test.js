import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Tags from "../tags";

describe("Tags", () => {
  test("renders tag", () => {
    const tag = "react";
    render(
      <BrowserRouter>
        <Tags tag={tag} index={0} />
      </BrowserRouter>
    );
    const tagLink = screen.getByRole("link");
    expect(tagLink).toHaveTextContent(tag);
    expect(tagLink.getAttribute("href")).toEqual("/tag/#react");
  });
});
