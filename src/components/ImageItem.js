// src/components/ImageItem.js
import React from 'react';
import styled from 'styled-components';
import {  FaCheckSquare } from 'react-icons/fa';


const DeleteIcon = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: none;  // hide it by default
  align-items: center;
  justify-content: center;
  color: red;
  font-weight: bold;
`;


const ImageContainer = styled.div`
  position: relative;
  width: 120px; 
  height: 120px; 
  border: 2px solid transparent;
  background: #fff;
  border-radius: 4px;
  margin: 10px;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }

  &:hover ${DeleteIcon} {
    display: block; 
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
  border-radius: 2px;
  transition: all 0.3s;
  transform: ${props => props.isSelected ? 'scale(0.95)' : 'scale(1)'};
`;

const SelectIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: blue;
`;



function ImageItem({ image, isSelected, onSelect, onDelete, onDragStart, onDragOver, onDrop }) {
  return (
    <ImageContainer draggable onDragStart={e => onDragStart(e, image.id)} onDragOver={onDragOver} onDrop={e => onDrop(e, image.id)}>
      <Image src={image.url} alt="Gallery Item" style={getImageStyle(isSelected)} onClick={() => onSelect(image.id)} />
      {isSelected && <SelectIcon><FaCheckSquare color="blue" /></SelectIcon>}
      {/* <DeleteIcon onClick={() => onDelete(image.id)}>D</DeleteIcon> */}
    </ImageContainer>
  );
}

export default ImageItem;
