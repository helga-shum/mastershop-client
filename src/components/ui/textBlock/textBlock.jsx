import React from "react";
import styles from "./textBlock.module.css";
import useModal from "../../utils/hooks/useModal";
import Modal from "../modal";
import PropTypes from "prop-types";

const TextBlock = ({ title, subtitle, description, authData }) => {
  const { modalVariety, handleModalOpen, handleModalClose, modalOpen } =
    useModal();

  return !authData ? (
    <div className={styles.textBlock}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
      
    </div>
  ) : (
    <>
      <div className={styles.textBlock}>
        <div className={styles.edit}>
          <h3>{authData.userName}</h3>
          <button onClick={() => handleModalOpen("editUser")}>
            <img src="/icons/actionIcons/edit.svg" alt="edit" />
          </button>
        </div>
        <p className={styles.subtitleAuth}>
          <b>Status:</b> {authData.orders ? "advanced" : "newbie"}
        </p>
        <p className={styles.subtitleAuth}>
          <b>Telephone:</b> {authData.phone}
        </p>
        <p className={styles.subtitleAuth}>
          <b>Email:</b> {authData.email}
        </p>
        <p className={styles.subtitleAuth}>
          <b>Address:</b> {authData.address}
        </p>
      </div>
      {modalOpen && (
        <Modal
          variety={modalVariety}
          isOpen={modalOpen}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

TextBlock.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  authData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
export default TextBlock;
