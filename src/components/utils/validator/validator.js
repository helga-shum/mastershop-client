import PropTypes from "prop-types";

export function validator(data, config) {
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case "isRequired": {
        if (typeof data === "boolean") {
          statusValidate = !data;
        } else if (typeof data === "number") {
          statusValidate = !data;
        } else {
          statusValidate = data.trim() === "";
        }
        break;
      }
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case "isCapitalSymbol": {
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(data);
        break;
      }
      case "isContainDigit": {
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(data);
        break;
      }
      case "min": {
        statusValidate = data.length < config.value;
        break;
      }
      case "isPhone": {
        
        const phoneRegExp =/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        statusValidate = !phoneRegExp.test(data);
        break;
      }
      case "isName": {
        const nameRegExp = /^[a-zA-Zа-яА-Я]+$/;
        statusValidate = !nameRegExp.test(data);
        break;
      }
      case "isAddress": {
        const addressRegExp =/^[A-Za-z0-9'\.\-\s\,]+$/;
        statusValidate = !addressRegExp.test(data);
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
validator.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object,
};
