// src/components/Gallery.js
import React, { useState } from 'react';
import styled from 'styled-components';
import ImageItem from './ImageItem';

const GalleryContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
`;

const ControlContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('image-can-drop');
  };

  const onDrop = (e, dropId) => {
    e.currentTarget.classList.remove('image-can-drop');

    const dragId = e.dataTransfer.getData('text');

    // Find the dragged image and the drop target
    const dragIndex = images.findIndex(img => img.id === parseFloat(dragId));
    const dropIndex = images.findIndex(img => img.id === dropId);

    if (dragIndex !== dropIndex) {
      const newImages = [...images];

      // Swap the images
      [newImages[dragIndex], newImages[dropIndex]] = [newImages[dropIndex], newImages[dragIndex]];

      setImages(newImages);
    }
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
      <ControlContainer>
        <input type="file" multiple onChange={addImages} />
        <div>
          <span>{selectedImages.length} images selected</span>
          <button onClick={deleteSelected}>Delete Selected</button>
        </div>
      </ControlContainer>

      <GalleryContainer>
        {images.map(image => (
          <ImageItem
            key={image.id}
            image={image}
            isSelected={selectedImages.includes(image.id)}
            onSelect={handleSelect}
            onDelete={handleDelete}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
          />
        ))}
      </GalleryContainer>
    </div>
  );
}

export default Gallery;
