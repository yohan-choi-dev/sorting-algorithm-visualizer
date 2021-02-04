import './button.styles.scss';
function Button({ name, className, children, onClick }) {
    const handleClick = (event) => onClick(event);
    return (
        <a name={name} className={className} href='#' onClick={handleClick}>
            {children}
        </a>
    );
}

Button.defaultProps = {
    className: 'button full',
};

export default Button;
