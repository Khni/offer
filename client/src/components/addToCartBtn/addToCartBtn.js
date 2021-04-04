import React, { useEffect, useState } from "react"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

import AdjustItemCount from './adjustItemCount'
const AddToCartBtn = (props) => {

    const [cartProductQty, updateCartProductQty] = useState(false)
    const [ProductQty, setProductQty] = useState(null)
    const [ProductCart, setProductCart] = useState(null)

    useEffect(() => {
        const fetching = async () => {
            await props.fetchCart(props.cartItems, props.token, props.isAuthenticated)

        }
        fetching();
    }, [props.ProductsOfCart])

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
    const submit = () => {
        confirmAlert({
            title: 'تم إضاقة المنتج بنجاح الي سلة المشتريات ، هل تريد أتمام الطلب؟',
            message: '',
            buttons: [

                {
                    label: 'لا، أريد الأستمرار في التسوق',
                    // onClick: 
                },
                {
                    label: 'نعم، أريد اتمام الطلب ',
                    onClick: () => props.history.push('/cart')
                }
            ]
        });
    };

    const addItem = () => {
        console.log("token from btn" + props.token);
        props.addItemToCartItem(props.item, props.cartItems, props.token, props.isAuthenticated)
        props.showAlarmWindowAction(btns, "تم إضافة المنتج بنجاح الي عربى الشراء، هل تريد إتمام الشراء؟")
        //  submit()
    }



    const checkItem = () => {
        const itemCheck = props.cartItems.find((item) => item.productID === props.item._id)
        return itemCheck
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
                itemQuantity={ProductQty} />}




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