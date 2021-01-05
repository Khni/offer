import React from "react"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { withRouter } from 'react-router-dom';

import AdjustItemCount from './adjustItemCount'
const addToCartBtn = (props) => {



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
        props.addItemToCartItem(props.item, props.cartItems)
       
        submit()
    }



    const checkItem = () => {
        const itemCheck = props.cartItems.find((item) => item._id === props.item._id)
        return itemCheck
    }


    return (


        <div>
            {!checkItem() ? <button type="submit" className="custum-btn-form"
                onClick={addItem}
            >ADD TO CART</button> : <AdjustItemCount
                    cartItems={props.cartItems}
                    item={props.item}
                    itemQuantity={checkItem().quantity} />}




        </div>
    );
}


export default withRouter(addToCartBtn) 