import React from 'react';
import MenuItems from './menuItems.scss';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {addItem} from '../../store/actions/CartItemsAction';
import { withRouter } from 'react-router-dom';

const menuItems = (props, {history,match})=>{

   return(
   <div>
   
    <div  className="item" 
    onClick={() => props.history.push(`${props.match.url+"item/" }${props.id}`)}>
   
   
   
   
 

<img src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/"+props.imgURL}  className="item-img"/>

<p className="item-title-menu-item">{props.item.nameEn} </p>



<p className="item-before-price">   {props.item.price * 1.23}   EGP </p>

<p className="item-price">  {props.item.price}  EGP  </p>




</div>

{/*<button className="custum-btn "  onClick={() => props.addItem(props.item)}>ADD TO CART  </button>*/}



</div>
     );
}
const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default withRouter(connect(
  null,
  mapDispatchToProps
)(menuItems));