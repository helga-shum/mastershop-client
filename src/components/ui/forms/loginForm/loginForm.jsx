import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import CheckBoxField from "../checkBoxField";
import TextField from "../textField";
import Button from "../../button";
import { useAuth } from "../../../utils/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./loginForm.module.css";
import PropTypes from "prop-types";

const LoginForm = ({ onClose }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });
  const { logIn } = useAuth();
  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setEnterError(null);
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Email is required",
      },
      isEmail: {
        message: "Email entered incorrectly",
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
      await logIn(data);
      onClose();
      navigate("/user");
    } catch (error) {
      setEnterError(error.message);
      setErrors(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="current-email"
        autoFocus
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
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
      Remain in the system
      </CheckBoxField>
      {enterError && <p className={styles.errorMessage}>{enterError}</p>}
      <div>
        <Button appearance="ctvBlueSubmit" type="submit" disabled={isValid}>
        Confirm
        </Button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  onClose: PropTypes.func,
};
export default LoginForm;
