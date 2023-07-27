import React, { useEffect } from "react";
import styles from "./adminPanel.module.css";
import TableItem from "./tableItem";
import CreateCardPanel from "./createCardPanel";

import { useDispatch, useSelector } from "react-redux";
import { loadCardsList } from "../../store/cards";
import Search from "../header/search";

const AdminPanel = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCardsList());
  }, []);
  const { entities: cards } = useSelector((state) => state.cards);

  return (
    <>
      <section>
        <h2 className={styles.orderHeading}>Store assortment</h2>
        <CreateCardPanel />
      </section>
      {cards?.map((card) => {
        return (
          <>
            <TableItem
              card={card}
              key={`${card._id}-${card.imageUrl[0]?._id}`}
              slides={card.imageUrl}
            />
          </>
        );
      })}
    </>
  );
};

export default AdminPanel;
