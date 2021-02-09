import './button.styles.scss';
function Button({ name, className, children, title, onClick }) {
    const handleClick = (event) => onClick(event);
    return (
        <a className={className} name={name} title={title} href='#' onClick={handleClick}>
            {children}
        </a>
    );
}

Button.defaultProps = {
    className: 'menu-button',
};

export default Button;
