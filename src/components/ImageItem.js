// src/components/ImageItem.js
import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
    outline: 1px solid #ccc; // This was the existing hover effect to show an outline.
  }
`;


const getImageStyle = (isSelected) => {
  return {
    border: isSelected ? '2px solid blue' : '1px solid transparent',
    opacity: isSelected ? 1 : 0.5
  };
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: ${props => props.isSelected ? '2px solid blue' : '1px solid transparent'};
`;

const SelectIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
`;

function ImageItem({ image, isSelected, onSelect, onDelete }) {
  return (
    <ImageContainer>
      <Image src={image.url} alt="Gallery Item" style={getImageStyle(isSelected)} onClick={() => onSelect(image.id)} />
      {isSelected && <SelectIcon>X</SelectIcon>}
      <DeleteIcon onClick={() => onDelete(image.id)}>D</DeleteIcon>
    </ImageContainer>
  );
}

export default ImageItem;
