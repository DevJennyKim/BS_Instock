import PropTypes from "prop-types";
import errorIcon from "../../assets/Icons/error-24px.svg";

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  errorMessage,
  formName,
}) {
  return (
    <label className={`${formName}__label`}>
      {label}
      <input
        type={type}
        className={`${formName}__input ${
          errorMessage && `${formName}__input--error`
        }`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errorMessage && (
        <p className={`${formName}__error-message`}>
          <img
            src={errorIcon}
            alt="error"
            className={`${formName}__error-message-icon`}
          />
          {errorMessage}
        </p>
      )}
    </label>
  );
}

export default FormField;

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  formName: PropTypes.string.isRequired,
};
