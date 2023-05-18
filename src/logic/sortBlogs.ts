import { DataTypes } from "../Interface/ProfileInterface";
import arrangeBlogs from "./arrangeBlogs";

export const sortBlogInLatest = (blogs: DataTypes[]) => {
  const sortData = blogs.sort(
    (a, b) =>
      +new Date(b.createdAt ? b.createdAt : b.updatedAt) -
      +new Date(a.createdAt ? +a.createdAt : +a.updatedAt)
  );
  return sortData;
};

export const filterByPublished = (blogs: DataTypes[]) => {
  const result = sortBlogInLatest(blogs);
  const published = result.filter(
    (blog: DataTypes) => blog.state === "published"
  );

  return published;
};

export const filterByDrafted = (blogs: DataTypes[]) => {
  const result = sortBlogInLatest(blogs);
  const draft = result.filter((blog) => blog.state === "draft");

  return draft;
};

export const filterByLength = (blogs: DataTypes[]) => {
  const result = sortBlogInLatest(blogs);
  const length = result.sort((blog) => blog.reading_time);
  return length;
};
export const filterByRelevant = (
  blogs: DataTypes[],
  searchHistory: string[]
) => {
  return arrangeBlogs(blogs, searchHistory);
};
