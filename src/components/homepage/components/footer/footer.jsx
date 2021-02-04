import './footer.styles.scss';

function Footer({ children }) {
    return (
        <footer className='footer'>
            <div className='footer__text'>{children}</div>
        </footer>
    );
}

export default Footer;
