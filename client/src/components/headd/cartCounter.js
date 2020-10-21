import React from "react"


const CartCounter = (props)=> {




    return(
        <buttom onClick={()=> props.click} className={props.class} >{props.total}</buttom>
    )
}

export default CartCounter