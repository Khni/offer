import React from 'react';
import MenuItems from './menuItems.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {addItem} from '../../store/actions/CartItemsAction';

const menuItems = (props, {history,match})=>{

   return(
   <div>
<Link className="item"
to={props.name.replace(" ", "-").replace(" ", "-").replace(" ", "-").replace(" ", "-").replace(" ", "-").replace(" ", "-")}
>

<img src={props.imgURL}  className="item-img"/>

<p className="item-title">{props.item.name} </p>



<p className="item-before-price">   {props.item.price * 1.23}   EGP </p>

<p className="item-price">  {props.item.price}  EGP  </p>

</Link>
<button className="custum-btn "  onClick={() => props.addItem(props.item)}>ADD TO CART  </button>

</div>
     );
}
const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(
  null,
  mapDispatchToProps
)(menuItems);