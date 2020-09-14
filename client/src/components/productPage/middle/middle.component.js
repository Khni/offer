import React from 'react'
import Style from './middle.scss'


import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {addItem} from '../../../store/actions/CartItemsAction';

const MiddleProduct = (props) => {


    return (

<div className="MiddleProduct">
<p>{props.name}</p>
    <p>Price: {props.price}EGP</p>
    <button type="submit" class="custum-btn-form" onClick={() => props.addItem(props.item)} >ADD TO CART</button>
</div>

    );
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
  });


export default connect(
    null,
    mapDispatchToProps
  )(MiddleProduct);