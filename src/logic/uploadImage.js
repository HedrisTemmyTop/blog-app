const uploadImage = (event, setImage, setFile) => {
  if (event.type === "change") {
    const selectedImage = event.target.files[0];
    console.log(event);
    if (selectedImage) {
      setFile(selectedImage);
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
    return;
  }
  const file = event.dataTransfer.files[0];
  setFile(file);
  const reader = new FileReader();
  reader.onload = () => {
    setImage(reader.result);
  };
  reader.readAsDataURL(file);
};

export default uploadImage;
