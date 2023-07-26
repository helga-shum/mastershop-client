
import Navigation from '../navigation/Navigation';
import React from 'react';
import SideFilter from '../sideFilter/SideFilter';
import styles from "../PageSide/pageSide.module.css";
const CatalogSide = ({toggleMenu}) => {

  
  return (
    <aside className={styles.pageSide}>
      <div className={`${styles.logoItems} ${styles.flex}`}>
        <h4 className={styles.logoName}>MasterShop</h4>
        <button onClick={toggleMenu}><img className={styles.close} width="50" height="50" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/></button>
      </div>
        <Navigation/>
        <SideFilter />
      
    </aside>
  );
};

export default CatalogSide;
