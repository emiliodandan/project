import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./ImageCarousel.css";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-carousel">
      <div className="image-wrapper">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            className={index === currentIndex ? "active" : ""}
          />
        ))}
      </div>
      <button onClick={handlePrev} className="arrow-button">
        <FaArrowLeft />
      </button>
      <button onClick={handleNext} className="arrow-button">
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ImageCarousel;
