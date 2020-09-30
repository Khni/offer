import React, { useState } from 'react';
import Navbar from '../navbar/navbar'
import DropdownMenu from '../dropdown/dropdown' 
import { ReactComponent as BoltIcon } from './icons/bolt.svg';

const  Header = () =>{
  return (
    <Navbar>
      <NavItem icon={<BoltIcon />} />
      <NavItem icon="🔥" />
      <NavItem icon="🔥" />

    <NavItem icon={<CaretIcon />}>
        <DropdownMenu></DropdownMenu>
    </NavItem>
    </Navbar>
  );
}

export default Header