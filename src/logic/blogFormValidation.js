const formValidation = (html, image, title, tags, description, state) => {
  if (!html) {
    alert("Body is empty");
    return false;
  }
  if (!image) {
    alert("Add content image");
    return false;
  }
  return {
    title: title,
    body: html,
    content_image: image,
    tags: tags,
    description: description,
    state,
  };
};

export default formValidation;
