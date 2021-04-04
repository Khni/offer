import React, { useEffect, useState } from "react"
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
// import Logger from '../../config/logger/logger'
import AdjustItemCount from './adjustItemCount'
const AddToCartBtn = (props) => {

    
    const [ProductQty, setProductQty] = useState(null)
    const [ProductCart, setProductCart] = useState(null)

    useEffect(() => {
        // Logger.console("useEffectLogger")

        const fetching = async () => {
            await props.fetchCart(props.cartItems, props.token, props.isAuthenticated)

        }
        fetching();
    }, [ProductQty])

    useEffect(() => {

        const product = props.ProductsOfCart.find(product => product._id == props.item._id)
        if (product) {
            setProductCart(product)
            setProductQty(product.quantity)
        } else {
            setProductCart(null)
            setProductQty(0)

        }


        console.log("ProductOfCart second" + JSON.stringify(props.ProductsOfCart));


    }, [props.ProductsOfCart])





    const btns = [
        {
            label: "نعم، أريد أتمام الشراء",
            onClick: () => props.history.push('/cart')
        },
        {
            label: "لا ، أريد الاستمرار في التسوق",
            onClick: () => { }
        },
    ]
    
    const addItem = () => {
        console.log("token from btn" + props.token);
        props.addItemToCartItem(props.item, props.cartItems, props.token, props.isAuthenticated)
        props.showAlarmWindowAction(btns, "تم إضافة المنتج بنجاح الي عربى الشراء، هل تريد إتمام الشراء؟")
        //  submit()
    }




    return (


        <div>
            {!ProductCart ? <button type="submit" className="custum-btn-form"
                onClick={addItem}
            >ADD TO CART</button> : <AdjustItemCount

                cartItems={props.cartItems}
                cartProducts={props.cartProducts}
                isAuthenticated={props.isAuthenticated}
                token={props.token}
                item={props.item}
                ProductQty={ProductQty} />}




        </div>
    );
}



const mapStateToProps = (state) => {
    return {

        RefreshToken: state.userAuth.authUser.refreshToken,
        ProductsOfCart: state.cartProductsReducer.cartProducts,

    }
}





export default withRouter(connect(mapStateToProps, actions)(AddToCartBtn))