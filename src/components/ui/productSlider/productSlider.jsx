import React, { useState, useEffect } from "react";
import Line from "../line";
import Slider from "../slider";
import Loading from "../loading";
import ProductSliderService from "../../services/productSliderService";

const ProductSlider = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
console.log(slides)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { content } = await ProductSliderService.getAll();
        setSlides(content);
        setIsLoading(false);
      } catch (error) {
        errorCatcher(error); 
      }
    };
    fetchData();
  }, []);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      console.log(error);
      setError(null);
    }
  }, [error]);

  return (
    <>
      <section>
        <Line />

        {isLoading ? (
          <Loading />
        ) : (
          <Slider slides={slides} appearance={"percentagesHigher"} slider/>
        )}
      </section>
    </>
  );
};

export default ProductSlider;
