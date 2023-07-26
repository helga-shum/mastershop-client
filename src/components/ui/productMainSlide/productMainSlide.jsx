import React, { useState, useEffect } from "react";
import styles from "./productMainSlide.module.css";

const ProductMainSlide = () => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 140) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <img
      className={`${styles.productMainSlide} ${isHidden ? styles.hidden : ""}`}
      src="/images/back.png"
      alt="ProductMainSlide"
    />
  );
};

export default ProductMainSlide;
