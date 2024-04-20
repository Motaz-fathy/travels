import React, { useState, useRef } from 'react';

const Slider = ({ children }) => {
  const sliderContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderContainerRef.current.offsetLeft);
    setScrollLeft(sliderContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderContainerRef.current.offsetLeft;
    const walk = (x - startX) * 0.6; // Adjust scroll speed by changing the multiplier
    sliderContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={sliderContainerRef}
      className=" overflow-x-auto   flex justify-between gap-4 scrollbar-hide px-8"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default Slider;
