import './navigation.styles.scss';

function Navigation() {
  return (
    <nav className='navigation'>
      <a className='navigation__link' href='http://www.yohan-choi.com'>
        Profile
      </a>
      <a className='navigation__link' href='https://www.linkedin.com/in/yohan-choi-dev/'>
        Linkedin
      </a>
      <a className='navigation__link' href='https://github.com/yohan-choi-dev'>
        Github
      </a>
    </nav>
  );
}

export default Navigation;
