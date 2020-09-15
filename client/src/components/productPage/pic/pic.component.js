import React from 'react'
import Style from './pic.scss'
const ProductPic = (props) => {


    return (

<div className="ProductPic">
<img src={props.imgURL}  className="product-img"/>
<div>
    <p><h2 className="share-this-product">SHARE THIS PRODUCT</h2></p>
    </div>
</div>


    );
}

export default ProductPic;