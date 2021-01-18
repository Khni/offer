import React, {useState} from 'react'
import './backdrop.scss';

import * as actions from '../../store/actions/cartAction.js'


import {
  sidebarHidden
  // ,cartHidden,  selectCartItems
} from '../../store/reducers/cart/cartReselect'

import { connect } from 'react-redux';
const Sidebar = props => {

  
  let backClass = "backDropWhite";
  if (props.show) {
    backClass = "backDropWhite open";
  }
  const onClickBackdrop=() =>{
    
  if (props.clickHandler) {
props.clickHandler()


} 
} 
  return (

    <div className={backClass} onClick={() => onClickBackdrop()}  >

    </div>


  )
}

function mapStateToProps(state) {
  return {
    isAuth: state.userAuth.authUser.isAuthenticated,
    errorMsg: state.userAuth.authUser.error,
    token: state.userAuth.authUser.token,
    name: state.userAuth.authUser.name,
    // hidden: cartHidden(state) ,
    hiddenSidebar: sidebarHidden(state),
    // totalItems: selectCartItems(state).reduce((accumalatedQuantity, item) =>accumalatedQuantity + item.quantity , 0)


  };
}


export default connect(mapStateToProps, actions)(Sidebar);