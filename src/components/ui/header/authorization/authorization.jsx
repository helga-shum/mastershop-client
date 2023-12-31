import React from "react";
import styles from "./authorization.module.css";
import Modal from "../../modal";
import useModal from "../../../utils/hooks/useModal";
import { useAuth } from "../../../utils/hooks/useAuth";

const Authorization = () => {
  const { currentUser } = useAuth();
  const { modalOpen, modalVariety, handleModalOpen, handleModalClose } =
    useModal();

  return (
    <>
      <div>
        {currentUser ? (
          <button
            onClick={() => handleModalOpen("logOut")}
            className={styles.logOut}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => handleModalOpen("signUp")}
              className={styles.signUp}
            >
              Register
            </button>
            <span> / </span>
            <button
              onClick={() => handleModalOpen("signIn")}
              className={styles.signIn}
            >
              Login
            </button>
          </>
        )}
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

export default Authorization;
