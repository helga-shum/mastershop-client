import React from "react";
import styles from "../filters/filters.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setMaxPrice, setMinPrice } from "../../store/filter";
import TextField from "../../ui/forms/textField";

const PriceFilter = () => {
  const { minPrice, maxPrice } = useSelector((state) => state.filters);
  const [lowPrice, setLowPrice] = React.useState(minPrice);
  const [highPrice, setHighPrice] = React.useState(maxPrice);

  const dispatch = useDispatch();

  const onChangeMinPrice = (target) => {
    const { value } = target;
    console.log(value);
    dispatch(setMinPrice(value));
    setLowPrice(value);
  };
  const onChangeMaxPrice = (target) => {
    const { value } = target;
    console.log(value);
    dispatch(setMaxPrice(value));
    setHighPrice(value);
  };
  return (
    <div className={styles.container}>
      <h4>Price Range($)</h4>
      <div className={styles.fields}>
        <TextField
          type="number"
          label="Minimum"
          name="min"
          value={lowPrice}
          placeholder="0"
          min="0"
          onChange={onChangeMinPrice}
          autoComplete="current-price"
        />
        <TextField
          type="number"
          label="Maximum"
          name="max"
          value={highPrice}
          placeholder="7000"
          min="0"
          onChange={onChangeMaxPrice}
          autoComplete="current-price"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
