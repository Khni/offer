import React from 'react';

const Navbar=(props)=> {
    return (
      <nav className="juv-navbar">
        <ul className="juv-navbar-nav">{props.children}</ul>
      </nav>
    );
  }


export default Navbar;