import React from 'react';
import BrandFilter from '../filters/BrandFilter';
import FabricFilter from '../filters/FabricFilter';
import PriceFilter from '../filters/PriceFilter';
import SizeFilter from '../filters/SizeFilter';
import { sort } from '../../utils/data';
import { useDispatch } from 'react-redux';
import { setSortType } from '../../store/filter';
import styles from "../sideFilter/sideFilter.module.css";

const SideFilter= () => {
  const dispatch = useDispatch();
  const setSelectedCategory=(value)=>{
    dispatch(setSortType(value))

  }
  return (
    <div className={styles.container}>
      <div className={`${styles.menuTitle} ${styles.flex}`}>
        <h4 className={styles.title}>Goods filter</h4>
        <span className={styles.line}></span>
      </div>
      <div className={styles.category}>
        <div className={styles.sort}>
          <h4>Sort by:</h4>
          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            {sort.map((sortItem, i )=>
            <option value={sortItem.sort}>{sortItem.name}</option>
          )}
          </select>
          </div>
          <PriceFilter />
          <SizeFilter />
          <FabricFilter />
          <BrandFilter />
        
      </div>
    </div>
  );
};
export default SideFilter;
