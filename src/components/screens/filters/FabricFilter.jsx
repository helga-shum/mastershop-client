import React from 'react';
import styles from "../filters/filters.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { fabrics } from '../../utils/data';
import { minusFabricFilter, setFabricFilter } from '../../store/filter';
const FabricFilter = () => {
  const dispatch = useDispatch();
  const { fabricFilter } = useSelector((state) => state.filters);
  const onClickChecked = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      dispatch(setFabricFilter(value));
    } else {
      dispatch(minusFabricFilter(value));
    }
  };
  return (
    <div className={styles.container}>
      <h4>
        Fabric type
      </h4>
      <div
        onClick={onClickChecked}
        className={styles.item}>
        {fabrics.map((item, index) => (
          <div key={index}>
            <input value={item} checked={fabricFilter.includes(item)} type="checkbox" onChange={onClickChecked} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FabricFilter;
