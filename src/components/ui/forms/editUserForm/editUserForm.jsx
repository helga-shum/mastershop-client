import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../textField";
import Button from "../../button";
import { useAuth } from "../../../utils/hooks/useAuth";
import PropTypes from "prop-types";

const EditUserForm = ({ onClose }) => {
  const { updateUserData, currentUser } = useAuth();
  const [data, setData] = useState({
    userName: currentUser.userName,
    phone: currentUser.phone,
    // email: currentUser.email,
    address: currentUser.address,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    userName: {
      isRequired: {
        message: "Name is required",
      },
      isName: {
        message: "The name must contain only letters",
      },
    },
    phone: {
      isRequired: {
        message: "Phone is required",
      },
      isPhone: {
        message: "Phone entered incorrectly. For example, (123)-456-7890, 123-456-7890, or 123456-7890.",
      },
    },

    address: {
      isRequired: {
        message: "Delivery address is required",
      },
      isAddress: {
        message: "Address example: City, Street, Pobedy st., 2, apt. 35",
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;


  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      await updateUserData(data);
      onClose();

    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="userName"
        value={data.userName}
        onChange={handleChange}
        error={errors.userName}
        autoComplete="current-name"
        autoFocus
      />
      <TextField
        label="Phone"
        name="phone"
        value={data.phone}
        onChange={handleChange}
        error={errors.phone}
        autoComplete="current-phone"
      />

      <TextField
        label="Delivery address"
        name="address"
        value={data.address}
        onChange={handleChange}
        error={errors.address}
        autoComplete="current-address"
      />
      <div>
        <Button appearance="ctvBlueSubmit" type="submit" disabled={isValid}>
          Confirm
        </Button>
      </div>
    </form>
  );
};

EditUserForm.propTypes = {
  onClose: PropTypes.func,
};
export default EditUserForm;
