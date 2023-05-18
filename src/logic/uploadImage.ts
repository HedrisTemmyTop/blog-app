import Compressor from "compressorjs";
import { ChangeEvent } from "react";

const uploadImage = (
  event: ChangeEvent<HTMLFormElement> | any,
  setImage: (result: string) => void
) => {
  if (event.type === "change") {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      new Compressor(selectedImage, {
        quality: 0.6,
        maxHeight: 454,
        maxWidth: 1500,
        mimeType: "jpeg",
        convertSize: 30720,
        success: (compressedFile) => {
          const reader: FileReader = new FileReader();
          reader.readAsDataURL(compressedFile);
          reader.onload = () => {
            setImage(reader.result as string);
          };
        },
        error: (error) => {
          return null;
        },
      });
    }
    return;
  }
  const file = event.dataTransfer.files[0];
  const reader: FileReader = new FileReader();
  reader.onload = () => {
    setImage(reader.result as string);
  };
  reader.readAsDataURL(file);
};

export default uploadImage;
