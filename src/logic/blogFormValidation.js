const formValidation = (
  html,
  image,
  title,
  tags,
  description,
  state,
  imageFile
) => {
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
    image: [image],
    tags: tags,
    description: description,
    state,
  };
};

export default formValidation;
