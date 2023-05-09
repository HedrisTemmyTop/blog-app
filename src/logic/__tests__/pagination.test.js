import Pagination, { resultsPerPage } from "../pagination";

describe("Pagination", () => {
  const posts = Array.from({ length: 30 }, (_, i) => ({ id: i }));

  it("returns the first page of results by default", () => {
    const result = Pagination(posts);
    expect(result.length).toEqual(resultsPerPage);
    expect(result[0].id).toEqual(0);
    expect(result[resultsPerPage - 1].id).toEqual(resultsPerPage - 1);
  });

  it("returns the specified page of results", () => {
    const result = Pagination(posts, 3);
    expect(result.length).toEqual(resultsPerPage);
    expect(result[0].id).toEqual((3 - 1) * resultsPerPage);
    expect(result[resultsPerPage - 1].id).toEqual(3 * resultsPerPage - 1);
  });

  it("returns an empty array if the page number is out of range", () => {
    const result = Pagination(posts, 100);
    expect(result.length).toEqual(0);
  });
});
