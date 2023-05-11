import arrangeBlogs from "./arrangeBlogs";

export const sortBlogInLatest = (blogs) => {
  const sortData = blogs.sort(
    (a, b) =>
      new Date(b.createdAt ? b.createdAt : b.updatedAt) -
      new Date(a.createdAt ? a.createdAt : a.updatedAt)
  );
  return sortData;
};

export const filterByPublished = (blogs) => {
  const result = sortBlogInLatest(blogs);
  const published = result.filter((blog) => blog.state === "published");
  console.log(published);
  return published;
};

export const filterByDrafted = (blogs) => {
  const result = sortBlogInLatest(blogs);
  const draft = result.filter((blog) => blog.state === "draft");
  console.log(draft);
  return draft;
};

export const filterByLength = (blogs) => {
  const result = sortBlogInLatest(blogs);
  const length = result.sort((blog) => blog.reading_time);
  return length;
};
export const filterByRelevant = (blogs) => {
  return arrangeBlogs(blogs);
};
