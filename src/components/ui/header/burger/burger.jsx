import React, { useState } from "react";
import styles from "./burger.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { scrollToFooter, scrollToCatalog } from "../../../utils/scrollers";
import CatalogSide from "../../../screens/PageSide/PageSide";

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

 

  return (
    <div className={styles.burgerMenu}>
      <button
        className={`${styles.icon} ${isOpen ? styles.active : ""}`}
        onClick={toggleMenu}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
      {isOpen && (
        <>
        <CatalogSide toggleMenu={toggleMenu}/>
        </>
      )}
    </div>
  );
};

export default React.memo(Burger);
