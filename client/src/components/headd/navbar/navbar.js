import React from 'react';

const Navbar=(props)=> {
    return (
      <nav className="juv-navbar">
        <ul className={props.navBarNav}>{props.children}</ul>
      </nav>
    );
  }


export default Navbar;