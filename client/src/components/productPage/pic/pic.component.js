import React from 'react'
import Style from './pic.scss'
const ProductPic = (props) => {


    return (

<div className="ProductPic">
<img src={props.imgURL}  className="product-img"/>
</div>

    );
}

export default ProductPic;
