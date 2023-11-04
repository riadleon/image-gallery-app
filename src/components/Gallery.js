
import React, { useState } from 'react';
import styled from 'styled-components';
import ImageItem from './ImageItem';
import { FaCheckSquare } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';


const GalleryContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const BigImageContainer = styled.div`
  width: 240px;
  height: 240px;
  margin: 10px;
  display: flex;              // Added flex display
  justify-content: center;    // Center content horizontally
  align-items: center;        // Center content vertically

  img {
    max-width: 100%;          // Maximum width is 100% of the container
    max-height: 100%;         // Maximum height is 100% of the container
    width: auto;              // Default width is auto (scale to height)
    height: auto;             // Default height is auto (scale to width)
  }
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

const AddImageBoxContainer = styled.div`
  width: 124px;  // Adjust the width to match the other image items
  height: 124px; // Adjust the height to match the other image items
  margin: 10px;  // Same margin as other items for consistent spacing
  border: 2px dashed #ccc;
  background-color: #f8f8f8;
  color: #bbb;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-color: #aaa;
    color: #888;
  }
`;
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* Ensure the container spans the full width */
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

  const unselectAll = () => {
    setSelectedImages([]);
  };


  const AddImageBox = ({ onFileChange }) => {
    const fileInputRef = React.useRef();

    const handleClick = () => {
      fileInputRef.current.click();
    };

    return (
      <AddImageBoxContainer onClick={handleClick}>
        <FaPlus size={32} />
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={onFileChange}
          style={{ display: 'none' }}
        />
      </AddImageBoxContainer>
    );
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
  const renderImageItems = () => {
    let galleryItems = images.map((image, index) => {
      // Making the first image bigger
      if (index === 0) {
        return (
          <BigImageContainer key={image.id}>
            <ImageItem
              image={image}
              isSelected={selectedImages.includes(image.id)}
              onSelect={handleSelect}
              onDelete={handleDelete}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              isBig={true}
            />
          </BigImageContainer>
        );
      }
      // Render the rest of the images
      return (
        <ImageItem
          key={image.id}
          image={image}
          isSelected={selectedImages.includes(image.id)}
          onSelect={handleSelect}
          onDelete={handleDelete}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          isBig={false}
        />
      );
    });

    
    galleryItems.push(
      <AddImageBox key="add-image" onFileChange={addImages} />
    );

    return galleryItems;
  };


  return (
    <div>
      <ControlContainer>
        <TopBar>
          {/* Make the entire span clickable to unselect all */}
          <button
            onClick={unselectAll}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <FaCheckSquare color="blue" /> {selectedImages.length} images selected
          </button>
          <button className='delete-selected-button' onClick={deleteSelected}>Delete Selected</button>
        </TopBar>
      </ControlContainer>

      <GalleryContainer>
        {renderImageItems()}
      </GalleryContainer>
    </div>
  );
}

export default Gallery;