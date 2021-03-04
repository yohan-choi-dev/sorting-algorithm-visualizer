import './input.styles.scss';

function Input({ className = 'input', type, name, placeholder, onInputChange }) {
  return (
    <input
      className={className}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onInputChange}
    />
  );
}
Input.defaultProps = {
  className: 'input',
};

export default Input;
