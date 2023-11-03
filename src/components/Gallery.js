// src/components/Gallery.js
import React, { useState } from 'react';
import styled from 'styled-components';
import ImageItem from './ImageItem';

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
`;

function Gallery({ initialImages }) {
  const [images, setImages] = useState(initialImages);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSelect = id => {
    setSelectedImages(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDelete = id => {
    setImages(images.filter(image => image.id !== id));
    setSelectedImages(selectedImages.filter(selectedId => selectedId !== id));
  };

  const deleteSelected = () => {
    setImages(images.filter(image => !selectedImages.includes(image.id)));
    setSelectedImages([]); // Clear the selected images
  };

  const addImages = (event) => {
    const files = event.target.files;
    let newImages = [...images];
    for (let file of files) {
      newImages.push({
        id: new Date().getTime() + Math.random(),
        url: URL.createObjectURL(file)
      });
    }
    setImages(newImages);
  };



  return (
    <div>
      {/* Input for adding more images */}
      <input type="file" multiple onChange={addImages} />

      {/* Display the count of selected images */}
      <div>{selectedImages.length} images selected</div>

      {/* Add the "Delete Selected" button */}
      <button onClick={deleteSelected}>Delete Selected</button>

      <GalleryContainer>
        {images.map(image => (
          <ImageItem
            key={image.id}
            image={image}
            isSelected={selectedImages.includes(image.id)}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        ))}
      </GalleryContainer>
    </div>
  );
}

export default Gallery;
