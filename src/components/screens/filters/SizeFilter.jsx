import React from 'react';
import styles from "../filters/filters.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { sizes } from '../../utils/data';
import { minusSizeFilter, setSizeFilter } from '../../store/filter';
const SizeFilter = () => {
  const dispatch = useDispatch();
  const { sizeFilter } = useSelector((state) => state.filters);
  console.log(sizeFilter)

  const onClickChecked = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      dispatch(setSizeFilter(value));
    } else {
      dispatch(minusSizeFilter(value));
    }
  };
  return (
    <div className={styles.container}>
      <h4>
        Size
      </h4>
      <div className={styles.item}>

        {sizes.map((item, index) => (
              <div key={index}>
              <input value={item} checked={sizeFilter.includes(item)} type="checkbox" onChange={onClickChecked} />
              <span>{item}</span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default SizeFilter;
