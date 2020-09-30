import React, { useState } from 'react';
import { ReactComponent as BoltIcon } from '../icons/bolt.svg';
import { ReactComponent as Useraccount } from '../icons/useraccount.svg';
import { ReactComponent as Favorite } from '../icons/favorite.svg';
import { ReactComponent as Orders } from '../icons/orders.svg';
import { ReactComponent as View } from '../icons/view.svg';
import { ReactComponent as Settings } from '../icons/setting.svg';
const DropdownMenu =() =>{


    function DropdownItem(props) {
      return (
        <a href="#" className="menu-item">
          <span className="icon-button">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </a>
      );
    }
  
    return (
      <div className="dropdown">
          <DropdownItem leftIcon={<Settings />}>Account Settings</DropdownItem>
          <DropdownItem leftIcon={<Orders />}>Orders</DropdownItem>
          <DropdownItem leftIcon={<Favorite />}>Favorite Items</DropdownItem>
          <DropdownItem leftIcon={<View />}>Viewed Items</DropdownItem>
      </div>
    )
  }

  export default DropdownMenu