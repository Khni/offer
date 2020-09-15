import React from 'react'
import Style from './middle.scss'


import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {addItem} from '../../../store/actions/CartItemsAction';

const MiddleProduct = (props) => {


    return (

<div className="MiddleProduct">
<h1 className="product-page-title">{props.name}</h1>
    <p className="product-page-price">Price: {" "+props.price+" "}EGP</p>
    <p className="brand-text">Brand: Fashion | Similar products from Fashion</p>
    <button type="submit" className="custum-btn-form middle-btn" onClick={() => props.addItem(props.item)} >ADD TO CART</button>
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