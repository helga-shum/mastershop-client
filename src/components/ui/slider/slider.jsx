import React, { useState, useMemo } from "react";
import styles from "./slider.module.css";
import cn from "classnames";
import PropTypes from "prop-types";

const Slider = ({ slides, appearance, slider }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const previousImage = () => {
    setCurrentIndex((currentIndex + slides.length - 1) % slides.length);
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  const image = useMemo(() => {
    return (
      <div>
        {slider ? (
          <>
            <img
              src={slides[currentIndex].image}
              alt="slide"
              className={styles.image}
            />
          </>
        ) : (
          <>
            <img
              src={slides[currentIndex]}
              alt="slide"
              className={styles.image}
            />
          </>
        )}
      </div>
    );
  }, [currentIndex]);

  return (
    <>
      <div className={styles.slider}>
        <div className={styles.imageContainer}>
          {image}

          {slides.length > 1 && (
            <>
              <div>
                <img
                  src="/icons/actionIcons/arrowSlide.svg"
                  alt="arrowSlideLeft"
                  onClick={previousImage}
                  className={
                    slider
                      ? cn(
                          styles.arrow,
                          styles.left,
                          {
                            [styles.percentagesHigherSlider]:
                              appearance === "percentagesHigher",
                            [styles.percentagesLowerSlider]:
                              appearance === "percentagesLower",
                          },
                          []
                        )
                      : cn(
                          styles.arrow,
                          styles.left,
                          {
                            [styles.percentagesHigher]:
                              appearance === "percentagesHigher",
                            [styles.percentagesLower]:
                              appearance === "percentagesLower",
                          },
                          []
                        )
                  }
                />
              </div>

              <div>
                <img
                  src="/icons/actionIcons/arrowSlide.svg"
                  alt="arrowSlideRight"
                  onClick={nextImage}
                  className={
                    slider
                      ? cn(
                          styles.arrow,
                          styles.right,
                          {
                            [styles.percentagesHigherSlider]:
                              appearance === "percentagesHigher",
                            [styles.percentagesLowerSlider]:
                              appearance === "percentagesLower",
                          },
                          []
                        )
                      : cn(
                          styles.arrow,
                          styles.right,
                          {
                            [styles.percentagesHigher]:
                              appearance === "percentagesHigher",
                            [styles.percentagesLower]:
                              appearance === "percentagesLower",
                          },
                          []
                        )
                  }
                />
              </div>
              <div className={styles.controls}>
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`${styles.dot} ${
                      currentIndex === index ? styles.active : ""
                    }`}
                  ></button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

Slider.propTypes = {
  slides: PropTypes.array,
  appearance: PropTypes.string,
};
export default Slider;
