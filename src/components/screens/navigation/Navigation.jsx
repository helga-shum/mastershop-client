import React from 'react';
import { Link } from 'react-router-dom';
import { categories, filterCategories } from '../../utils/data';
import {  setCategoryId } from '../../store/filter';
import { useDispatch } from "react-redux";
import styles from "../navigation/navigation.module.css";
const Navigation = () => {


const dispatch = useDispatch()
const onClickCategory=(i)=>{
    dispatch(setCategoryId(i))
}

  return (
    <nav className={styles.container}> 
        <div className={styles.menuItems}>
          <ul className={styles.menuItem}>
            <div className={`${styles.menuTitle} ${styles.flex}`}>
              <h4 className={styles.title}>Categories</h4>
              <span className={styles.line}></span>
            </div>
            {filterCategories.map((categoryName, i) => (
              <Link to="/">
                
                <li className={styles.item}>
                  
                  <a
                    onClick={() => {
                      onClickCategory(i);
                    }}
                    className={`${styles.link} ${styles.flex}`}>
                    
                    <span>{categoryName}</span>
                  </a>
                </li>
              </Link>
            ))}
          </ul> 
        </div>
      
    </nav>
  );
};
export default Navigation;
