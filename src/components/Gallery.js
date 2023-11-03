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

  return (
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
  );
}

export default Gallery;
