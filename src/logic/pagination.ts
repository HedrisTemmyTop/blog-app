import { DataTypes } from "../Interface/ProfileInterface";

export const resultsPerPage = 9;

const Pagination = (posts: DataTypes[], page = 1): DataTypes[] => {
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;
  const paginatedData = posts.slice(start, end);
  return paginatedData;
};

export default Pagination;
