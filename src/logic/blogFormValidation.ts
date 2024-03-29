const formValidation = (
  html: string,
  image: string,
  title: string,
  tags: string[],
  description: string,
  state: string
) => {
  if (!html) {
    alert("Body is empty");
    return false;
  }
  if (!image) {
    alert("Add content image");
    return false;
  } else if (image && image.length === 0) {
    alert("Add content image");
    return false;
  } else if (tags.length === 0) {
    alert("Add some tags");
    return false;
  } else
    return {
      title: title,
      body: html,
      image: [image],
      tags: tags,
      description: description,
      state,
    };
};

export default formValidation;
