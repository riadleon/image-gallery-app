// src/App.js
import React from 'react';
import './App.css';
import Gallery from './components/Gallery';

const initialImages = [
  { id: 1, url: '/assets/images/image-1.webp' },
  { id: 2, url: '/assets/images/image-2.webp' },
  { id: 3, url: '/assets/images/image-3.webp' },
  { id: 4, url: '/assets/images/image-4.webp' },
  { id: 5, url: '/assets/images/image-5.webp' },
  { id: 6, url: '/assets/images/image-6.webp' },
  { id: 7, url: '/assets/images/image-7.webp' },
  { id: 8, url: '/assets/images/image-8.webp' },
  { id: 9, url: '/assets/images/image-9.webp' },
  { id: 10, url: '/assets/images/image-10.jpeg' },
  { id: 11, url: '/assets/images/image-11.jpeg' },


];

function App() {
  return (
    <div className="App">
      <Gallery initialImages={initialImages} />
    </div>
  );
}

export default App;
