
import React from 'react';
import styled from 'styled-components';
import { FaCheckSquare } from 'react-icons/fa';


const DeleteIcon = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  background-color: white;
  width: 20px;
  height: 20px;
  display: ${props => props.isSelected ? 'block' : 'none'};
  align-items: center;
  justify-content: center;
  color: red;
  font-weight: bold;
`;

const DynamicImageContainer = styled.div`
  position: relative;
  width: ${props => props.isBig ? '240px' : '120px'}; 
  height: ${props => props.isBig ? '240px' : '120px'}; 
  border: 2px solid transparent;
  background: #fff;
  border-radius: 4px;
  margin: 10px;
  transition: all 0.3s;
  display: flex;              
  justify-content: center;    
  align-items: center;        

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

  // Apply different styles when the image is supposed to be big
  ${props => props.isBig && `
    width: auto; // Adjust as necessary for your layout
    height: auto; // Adjust as necessary for your layout
    max-width: 100%; // Prevents the image from overflowing its container
    max-height: 100%; // Prevents the image from overflowing its container
  `}
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



function ImageItem({ image, isSelected, onSelect, onDelete, onDragStart, onDragOver, onDrop, isBig }) {
  return (
    <DynamicImageContainer
      draggable
      onDragStart={e => onDragStart(e, image.id)}
      onDragOver={onDragOver}
      onDrop={e => onDrop(e, image.id)}
      isBig={isBig}
    >
      <Image
        src={image.url}
        alt="Gallery Item"
        style={getImageStyle(isSelected)}
        onClick={() => onSelect(image.id)}
        isBig={isBig}
      />
      {isSelected && <SelectIcon><FaCheckSquare color="blue" /></SelectIcon>}
      
    </DynamicImageContainer>
  );
}

export default ImageItem;