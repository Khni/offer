import React, { useState } from 'react';
import { ReactComponent as BoltIcon } from '../icons/bolt.svg';
import { ReactComponent as Useraccount } from '../icons/useraccount.svg';
import { ReactComponent as Favorite } from '../icons/favorite.svg';
import { ReactComponent as Orders } from '../icons/orders.svg';
import { ReactComponent as View } from '../icons/view.svg';
import { ReactComponent as Settings } from '../icons/setting.svg';
import MenuIcontText from '../MenuIcontText/MenuIcontText
const ChoicesMenuContainer =(props) =>{


   return (
      <div className="dropdown">
      {props.dropDownItems.map((item)=><MenuIcontText leftIcon={item.icon} link={item.link}>{item.title}</MenuIcontText>)}
      
      
          
      </div>
    )
  }

  export default ChoicesMenuContainer