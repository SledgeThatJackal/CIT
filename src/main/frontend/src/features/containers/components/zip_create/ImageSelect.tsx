import { ContainerImageType } from "@schema/Image";
import React, { useContext, useMemo } from "react";

import "../../styles/ImageSelect.css";
import { ContainerContext } from "./ZipCreate";

const ImageSelect = () => {
  const containerContext = useContext(ContainerContext);

  if (!containerContext)
    throw new Error(
      "ImageSelect can only be used inside of a ContainerContext Provider",
    );

  const { container, selectedImages, setSelectedImages } = containerContext;

  const containerImages = useMemo(() => container.images, [container.images]);

  const toggleSelect = (selectedImage: ContainerImageType) => {
    setSelectedImages((prev) =>
      prev.includes(selectedImage)
        ? prev.filter((image) => image.image.id !== selectedImage.image.id)
        : [...prev, selectedImage],
    );
  };

  return (
    <div className="photo-grid shadow">
      {containerImages &&
        containerImages.map((image) => (
          <div
            key={image.image.id}
            className={`photo-container ${selectedImages.includes(image) ? "selected" : ""}`}>
            <div className="photo" onClick={() => toggleSelect(image)}>
              <img
                src={`/api/image/${image.image.fileName}`}
                alt={`Image- ${image.image.fileName}`}
                draggable={false}
              />
              <label
                className={`photo-checkbox ${selectedImages.includes(image) ? "selected" : ""}`}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ImageSelect;
