import React, { useState } from "react";
import LoginForm from "../../forms/loginForm";
import RegisterForm from "../../forms/registerForm";
import Button from "../../button";
import styles from "./modalContent.module.css";
import { useAuth } from "../../../utils/hooks/useAuth";
import { useNavigate } from "react-router-dom";

import CardEditForm from "../../adminPanel/cardEditForm";
import EditUserForm from "../../forms/editUserForm";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { deleteCard } from "../../../store/cards";


export const SuccessModalContent = () => {
  const navigate = useNavigate();
 
  return (
    <>
      <h2 className={styles.heading}>Congratulations!</h2>
      <h3>Your order has been successfully placed!</h3>
      <img
        className={styles.logo}
        src="/images/logoInForm/logoInForm.jpg"
        alt="logo"
      />
      <p className={styles.warning}>
        <b>ATTENTION!</b> Delivery is carried out within 30 days from the moment
        order
      </p>
      <Button
        appearance="ctvBlue"
        onClick={() => {
          navigate("/user");
        }}
      >
        Look
      </Button>
    </>
  );
};

export const OrderModalContent = ({ orderData, onConfirm }) => {
  return (
    <>
      <h2 className={styles.heading}>Checkout</h2>
      <table>
        <thead>
          <tr>
            <th>Order Description</th>
            <th>Order data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Number of goods:</td>
            <td>{`${orderData.totalQuantity} p.`}</td>
          </tr>
          <tr>
            <td>Amount payable:</td>
            <td>{`${+orderData.totalPrice.toFixed(2)} p.`}</td>
          </tr>
          <tr>
            <td>Delivery address:</td>
            <td>{orderData.address}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Payment:</td>
            <td>Cash or card</td>
          </tr>
        </tfoot>
      </table>
      <p className={styles.warning}>
        <b className={styles.warning}>ATTENTION! Payment upon receipt!</b>
      </p>
      <Button appearance="ctvBlue" onClick={onConfirm}>
      Confirm
      </Button>
    </>
  );
};
OrderModalContent.propTypes = {
  orderData: PropTypes.object,
  onConfirm: PropTypes.func,
};

export const LogOutModalContent = ({ onClose }) => {
  const { logOut } = useAuth();
  return (
    <>
      <h2 className={styles.heading}>Logout</h2>
      <p className={styles.message}>Are you sure you want to log out of your account?</p>
      <Button
        appearance="ctvBlue"
        onClick={() => {
          onClose();
          logOut();
        }}
      >
        Logout
      </Button>
    </>
  );
};
LogOutModalContent.propTypes = {
  onClose: PropTypes.func,
};

export const AuthModalContent = ({ variety, onClose }) => {
  const [newVariety, setNewVariety] = useState(variety);
  const handleClick = (variant) => {
    setNewVariety(variant === "signIn" ? "signUp" : "signIn");
  };

  return newVariety === "signIn" ? (
    <>
      <h2 className={styles.heading}>Login to your account</h2>
      <LoginForm onClose={onClose} />
      <p className={styles.warning}>
        <b>ATTENTION!</b> Please enter your details correctly.
 
      </p>
      <button
        className={styles.btnContainer}
        onClick={() => handleClick("signIn")}
      >
        First time on our site? Register
      </button>
    </>
  ) : (
    <>
      <h2 className={styles.heading}>Register on the site</h2>
      <RegisterForm onClose={onClose} />
      <p className={styles.warning}>
      <b>ATTENTION!</b> Please enter your details correctly.

      </p>
      <button
        className={styles.btnContainer}
        onClick={() => handleClick("signUp")}
      >
        Already have an account? Login
      </button>
    </>
  );
};
AuthModalContent.propTypes = {
  onClose: PropTypes.func,
  variety: PropTypes.string,
};

export const EditCardContent = ({ editData }) => {

  const { cardId, onClose, slides } = editData;
  return (
    <>
      <h2 className={styles.heading}>Card editing</h2>
      <CardEditForm cardId={cardId} onClose={onClose} slides={slides}/>
      <p className={styles.warning}>
        <b>ATTENTION!</b> Please enter your details correctly.
      </p>
    </>
  );
};
EditCardContent.propTypes = {
  editData: PropTypes.object,
};



export const EditUserContent = ({ onClose }) => {
  return (
    <>
      <h2 className={styles.heading}>User editing</h2>
      <EditUserForm onClose={onClose} />
      <p className={styles.warning}>
        <b>ATTENTION!</b> Please enter your details correctly.
      </p>
    </>
  );
};
EditUserContent.propTypes = {
  onClose: PropTypes.func,
};

export const InDelivery = ({ onClose, onHandleDelivered }) => {
  return (
    <>
      <h2 className={styles.heading}>Delivery</h2>
      <h3 className={styles.heading}>
      Your items are on delivery.
        <br /> Do you want to confirm receipt?
      </h3>
      <Button
        appearance="ctvBlue"
        onClick={() => {
          onClose();
          onHandleDelivered();
        }}
      >
        Confirm
      </Button>
      <p className={styles.warning}>
        <b>ATTENTION!</b> Confirm with the courier.
      </p>
    </>
  );
};
InDelivery.propTypes = {
  onClose: PropTypes.func,
  onHandleDelivered: PropTypes.func,
};

export const DeletionCardConfirm = ({ deleteData }) => {
  const dispatch = useDispatch();
  const { cardId, slidesIds, onClose } = deleteData;
  return (
    <>
      <h2 className={styles.heading}>Removing an element</h2>
      <p className={styles.message}>Are you sure you want to delete this?</p>
      <Button
        appearance="ctvBlue"
        onClick={() => {
          dispatch(deleteCard(cardId)),
           
                      onClose();
        }}
      >
        Delete
      </Button>
    </>
  );
};
DeletionCardConfirm.propTypes = {
  deleteData: PropTypes.object,
};


