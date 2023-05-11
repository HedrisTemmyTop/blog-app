const arrangeBlogs = (blogs, searchHistory) => {
  const searched = {};

  for (const search of searchHistory) {
    const searchRegex = new RegExp(search, "i");
    for (const blog of blogs) {
      if (searchRegex.test(blog.title) || blog.tags.includes(search)) {
        if (searched.hasOwnProperty(blog.title)) {
          if (searchRegex.test(blog.title) && blog.tags.includes(search)) {
            searched[blog.title] += 2;
          } else {
            searched[blog.title]++;
          }
        } else {
          searched[blog.title] = 1;
        }
      }
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => {
    const frequencyA = searched[a.title] || 0;
    const frequencyB = searched[b.title] || 0;

    // Compare the frequencies first
    if (frequencyB !== frequencyA) {
      return frequencyB - frequencyA;
    } else {
      // If frequencies are equal, compare the titles
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return titleA.localeCompare(titleB);
    }
  });

  return sortedBlogs;
};

export default arrangeBlogs;
