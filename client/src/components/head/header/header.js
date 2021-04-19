import React, { useState } from 'react';
import Navbar from '../navbar/navbar'
import DropdownMenu from '../dropdown/dropdown' 
import NavItem from '../NavItem/NavItem'
import { ReactComponent as BoltIcon } from '../icons/usernew.svg';
import { ReactComponent as CartIcon } from '../icons/cart.svg';

const  Header = () =>{
  return (
    <Navbar>
<NavItem icon={<BoltIcon />}>
        <DropdownMenu></DropdownMenu>
    </NavItem>

      <NavItem icon={<CartIcon />} />
      

    
    </Navbar>
  );
}

export default Header