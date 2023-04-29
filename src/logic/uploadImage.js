import Compressor from "compressorjs";

const uploadImage = (event, setImage, setFile) => {
  if (event.type === "change") {
    const selectedImage = event.target.files[0];

    console.log(event);
    if (selectedImage) {
      new Compressor(selectedImage, {
        quality: 0.6,
        maxHeight: 454,
        maxWidth: 1500,
        mimeType: "jpeg",
        success: (compressedFile) => {
          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          reader.onload = () => {
            setImage(reader.result);
          };
        },
        error: (error) => {
          console.log(error);
        },
      });
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
