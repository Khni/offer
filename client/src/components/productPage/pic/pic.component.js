import React from 'react'
import Style from './pic.scss'

import FBicon from "../../form/img/Facebookicon.png"
import googleicon from "../../form/img/googleicon.png"

const ProductPic = (props) => {


    return (

<div className="ProductPic">
<img src={props.imgURL}  className="product-img"/>
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

export default ProductPic;