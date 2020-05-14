import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [navbarDisplay, setNavbarDisplay] = useState(false);
  const toggleMobileNavbarDisplay = () => {
    setNavbarDisplay(!navbarDisplay);
  }
  return (
    <header className="header">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="Logo" />
          </a>
          <a role="button" className={'navbar-burger burger ' + (navbarDisplay ? 'is-active': '')} aria-label="menu" aria-expanded="false"
            data-target="main-navbar" onClick={toggleMobileNavbarDisplay}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="main-navbar" className={'navbar-menu ' + (navbarDisplay ? 'is-active': '')}>
          <div className="navbar-end">
            <Link to="/posts" className="navbar-item">
              Posts
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;
