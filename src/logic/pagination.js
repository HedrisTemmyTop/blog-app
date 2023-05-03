export const resultsPerPage = 9;

const Pagination = (posts, page = 1) => {
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;
  const paginatedData = posts.slice(start, end);
  return paginatedData;
};

export default Pagination;
