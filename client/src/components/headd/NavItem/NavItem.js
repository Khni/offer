import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const NavItem =(props)=> {
    const [open, setOpen] = useState(false);
  
    return (
      
        <Link to={props.link} className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
          {open && props.children}
        </Link>
  
        
      
    );
  }

  export default NavItem