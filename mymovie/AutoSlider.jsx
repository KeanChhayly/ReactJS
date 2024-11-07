import React, { useState, useEffect } from "react";

const images = [
  "./image/movie1.jpg",
  "./image/movie2.jpg",
  "./image/movie3.jpg",
];

function AutoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set up the interval to change the slide every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={sliderStyles}
      className="d-block d-none d-sm-block col-lg-12 col-md-12"
    >
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={slideImageStyles}
      />
      <div style={dotsContainerStyles}>
        {images.map((_, index) => (
          <span
            key={index}
            style={{
              ...dotStyle,
              backgroundColor: currentIndex === index ? "black" : "white",
            }}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

// Styling objects for slider components
const sliderStyles = {
  position: "relative",
  width: "100%", // Use full width of the container
  height: "50vh", // Set height to 50% of viewport height for responsiveness
  margin: "0 auto",
  overflow: "hidden",
};

const slideImageStyles = {
  width: "100%",
  height: "100%",
  objectFit: "cover", // Ensures images maintain their aspect ratio
};

const dotsContainerStyles = {
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "10px",
};

const dotStyle = {
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  cursor: "pointer",
};

export default AutoSlider;
