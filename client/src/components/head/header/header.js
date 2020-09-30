import React, { useState } from 'react';
import Navbar from '../navbar/navbar'
import DropdownMenu from '../dropdown/dropdown' 
import NavItem from '../NavItem/NavItem'
import { ReactComponent as BoltIcon } from '../icons/user.svg';

const  Header = () =>{
  return (
    <Navbar>
<NavItem icon={<BoltIcon />}>
        <DropdownMenu></DropdownMenu>
    </NavItem>

      <NavItem icon={<BoltIcon />} />
      <NavItem icon="🔥" />
      <NavItem icon="🔥" />

    
    </Navbar>
  );
}

export default Header