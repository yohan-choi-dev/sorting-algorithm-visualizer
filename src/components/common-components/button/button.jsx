import './button.styles.scss';
function Button({ id, name, title, className, onClick, children }) {
  const handleClick = (event) => onClick(event);
  return (
    <a id={id && id} name={name} title={title} href='#' className={className} onClick={handleClick}>
      {children}
    </a>
  );
}

Button.defaultProps = {
  className: 'menu-button',
};

export default Button;
