// src/components/Gallery.js
import React, { useState } from 'react';
import styled from 'styled-components';
import ImageItem from './ImageItem';
import { FaCheckSquare } from 'react-icons/fa';

const GalleryContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ControlContainer = styled.div`
  max-width: 800px;
  margin: 1rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input[type="file"] {
    display: none;
  }

  label {
    padding: 0.5rem 1rem;
    background-color: #eee;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }

  .selected-info {
    display: flex;
    align-items: center;

    span {
      margin-right: 1rem;
    }
  }
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
        <div>
          <span> <FaCheckSquare color="blue" /> {selectedImages.length} images selected</span>
          <button className='delete-selected-button' onClick={deleteSelected}>Delete Selected</button>
        </div>
        <label>
          Add Images
          <input type="file" multiple onChange={addImages} />
        </label>
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
