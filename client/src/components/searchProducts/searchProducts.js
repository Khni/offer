import React, { useEffect, useState } from "react"
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
// import Logger from '../../config/logger/logger'
import AdjustItemCount from './adjustItemCount'
const SearchProducts = (props) => {

    
    const [search, setSearch] = useState('')
  //  const [ProductCart, setProductCart] = useState(null)
const searchUpdate = (event)=> {
    setSearch({ search: event.target.value.substr(0, 20) })
  }
  let productsFiltered = props.products.filter((itemProduct) => {
      return itemProduct.nameEn.indexOf(search) !== -1
    })
    useEffect(() => {
        

        const fetching = async () => {
            await props.fetchProducts(props.productsIsFetching);


        }
        fetching();
    }, [ProductQty])

/*    useEffect(() => {

        const product = props.ProductsOfCart.find(product => product._id == props.item._id)
        if (product) {
            setProductCart(product)
            setProductQty(product.quantity)
        } else {
            setProductCart(null)
            setProductQty(0)

        }


        console.log("ProductOfCart second" + JSON.stringify(props.ProductsOfCart));


    }, [props.ProductsOfCart])*/





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
    
  /*  const addItem = () => {
        console.log("token from btn" + props.token);
        props.addItemToCartItem(props.item, props.cartItems, props.token, props.isAuthenticated)
        props.showAlarmWindowAction(btns, "تم إضافة المنتج بنجاح الي عربى الشراء، هل تريد إتمام الشراء؟")
        //  submit()
    }*/




    return (


        <div className="TableList-container">
        <div className="Tabel-Header">
          <h3>Products List</h3>
          <input className="input-search-tableList" type='text' value={search} onChange={searchUpdate()} placeholder="search....." />
        </div>
        <div >

            
            {!props.productsIsFetching ?
                      <table className="TableList">
            <tr><th>product name</th> <th>Quantity</th> <th>Price</th></tr>
                            {productsFiltered.map((product, i) => {
              return <tr key={i + 1}><td key={i + 2}>{product.nameEn}</td><td key={i + 3}>{product.quantity}</td><td key={i + 4}>{product.price}</td><p>Edit</p><p className="menu-product" onClick={()=>this.submit(product.nameEn, product._id)}>Delete</p></tr>
            })} </table>:  <div className="loader"/>}

            
           
            
   
            
            
          
        </div>
      </div>
    );
}



const mapStateToProps = (state) => {
    return {

        RefreshToken: state.userAuth.authUser.refreshToken,
        ProductsOfCart: state.cartProductsReducer.cartProducts,
        isLoading: state.cartProductsReducer.isLoading,
        productsFetched: state.categoryReducer.productsFetched,
    productsIsFetching: state.categoryReducer.productsIsFetching,
    products: state.categoryReducer.products, 


    }
}





export default withRouter(connect(mapStateToProps, actions)(SearchProducts))