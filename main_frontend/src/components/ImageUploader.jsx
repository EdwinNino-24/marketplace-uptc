import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = () => {
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <p>Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos</p>
      </div>
      <div className="image-preview">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img src={image.preview} alt={`Imagen ${index}`} />
            <button onClick={() => removeImage(index)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
