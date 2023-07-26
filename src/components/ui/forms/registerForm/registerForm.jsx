import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import CheckBoxField from "../checkBoxField";
import TextField from "../textField";
import Button from "../../button";
import { useAuth } from "../../../utils/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const RegisterForm = ({ onClose }) => {
  const [data, setData] = useState({
    userName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    licence: false,
  });
  const { signUp } = useAuth();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
    email: {
      isRequired: {
        message: "Email is required",
      },
      isEmail: {
        message: "Email entered incorrectly",
      },
    },
    address: {
      isRequired: {
        message: "Delivery address is required",
      },
      isAddress: {
        message: "Address example: City, Street st., 2, apt. 35",
      },
    },
    password: {
      isRequired: {
        message: "Password is required",
      },
      isCapitalSymbol: {
        message:
          "The password must contain at least one latin capital letter",
      },
      isContainDigit: {
        message: "Password must contain at least one number",
      },
      min: {
        message: "Password must be at least 8 characters long",
        value: 8,
      },
    },
    licence: {
      isRequired: {
        message:
          "You may not use our service without confirming the license agreement",
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
      await signUp(data);
      onClose();
      navigate("/user");
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
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="current-email"
      />
      <TextField
        label="Address"
        name="address"
        value={data.address}
        onChange={handleChange}
        error={errors.address}
        autoComplete="current-address"
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
        autoComplete="current-password"
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
        autoComplete="current-licence"
      >
        Confirm <a>license agreement</a>
      </CheckBoxField>
      <div>
        <Button appearance="ctvBlueSubmit" type="submit" disabled={isValid}>
        Confirm
        </Button>
      </div>
    </form>
  );
};

RegisterForm.propTypes = {
  onClose: PropTypes.func,
};
export default RegisterForm;
