// src/components/ImageItem.js
import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 2px solid transparent;
  &:hover {
    border: 2px solid #ccc;
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
  transition: border 0.3s;
  border: ${props => props.isSelected ? '2px solid blue' : '2px solid transparent'};
`;

const SelectIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ImageItem({ image, isSelected, onSelect, onDelete, onDragStart, onDragOver, onDrop }) {
  return (
    <ImageContainer draggable onDragStart={e => onDragStart(e, image.id)} onDragOver={onDragOver} onDrop={e => onDrop(e, image.id)}>
      <Image src={image.url} alt="Gallery Item" style={getImageStyle(isSelected)} onClick={() => onSelect(image.id)} />
      {isSelected && <SelectIcon>X</SelectIcon>}
      <DeleteIcon onClick={() => onDelete(image.id)}>D</DeleteIcon>
    </ImageContainer>
  );
}

export default ImageItem;
