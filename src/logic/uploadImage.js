const uploadImage = (event, setImage) => {
  if (event.type === "change") {
    const selectedImage = event.target.files[0];
    console.log(event);
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
    return;
  }
  const file = event.dataTransfer.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    setImage(reader.result);
  };
  reader.readAsDataURL(file);
};

export default uploadImage;
