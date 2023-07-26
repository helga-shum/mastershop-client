import React from 'react';
import styles from "../filters/filters.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { brands } from '../../utils/data';
import { minusBrandFilter, setBrandFilter } from '../../store/filter';
const BrandFilter = () => {
  const dispatch = useDispatch();
  const { brandFilter } = useSelector((state) => state.filters);
  const onClickChecked = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      dispatch(setBrandFilter(value));
    } else {
      dispatch(minusBrandFilter(value));
    }
  };
  return (
    <div className={styles.container}>
        <h4>Brands</h4>
      <div
      className={styles.item}
        onClick={onClickChecked}>
        {brands.map((item, index) => (
          <div key={index}>
            <input value={item} checked={brandFilter.includes(item)} type="checkbox" onChange={onClickChecked} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
