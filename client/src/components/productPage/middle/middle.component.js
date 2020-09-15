import React from 'react'
import Style from './middle.scss'

import FBicon from "../../form/img/Facebookicon.png"
import googleicon from "../../form/img/googleicon.png"
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

    <div>
    <p><h2 className="share-this-product">SHARE THIS PRODUCT</h2></p>
    <div className="share-icons-product">
    <img className="fb-btn" src={FBicon}  />
    <img className="google-btn" src={googleicon}  />

    </div>
    
    </div>
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