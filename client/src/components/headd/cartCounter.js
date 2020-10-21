import React from "react"


const CartCounter = (props)=> {




    return(
        <buttom onClick={()=> props.click} className="CounterCart" >{props.total}</buttom>
    )
}

export default CartCounter