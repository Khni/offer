import React, { useEffect, useState } from "react"
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { selectCartItems } from '../../store/reducers/cart/cartReselect';
import AddToCartBtn from '../addToCartBtn/addToCartBtn'
import Header from '../headd/header/header'
// import Logger from '../../config/logger/logger'

const SearchProducts = (props) => {


    const [search, setSearch] = useState('')
    //  const [ProductCart, setProductCart] = useState(null)
    const searchUpdate = (event) => {
        setSearch(event.target.value.substr(0, 20))
    }
    let productsFiltered = props.products.filter((itemProduct) => {
        return itemProduct.nameEn.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })
    useEffect(() => {


        const fetching = async () => {
            await props.fetchProducts(props.productsIsFetching);


        }
        fetching();
    }, [])

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

























        <div className="menu-container">
            <Header /> 

            <input className="input-search-main" type='text' value={search} onChange={searchUpdate} placeholder="search....." />

            <div className="full-menu">


                {!props.productsIsFetching ?
                    <table className="TableList">

                        {productsFiltered.map((item, i) => {
                            return <div className="cart-Item" >



                                <div>
                                    <div className="cart-item-desc">
                                        <img alt={item.nameEn} src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/" + item.imgURLs[0].imgURL} className="cart-item-img" />
                                        <div className="cart-item-details">
                                            <p className="cart-item-title margin0">{item.nameEn} </p>
                                            <p className="cart-item-before-price margin0">   EGP {item.price * 1.24} </p>
                                            <p className="cart-item-price margin0">   EGP   {item.price}  </p>
                                        </div>{/* end of cart-utem-details*/}
                                    </div>{/* end of cart-item-desc*/}

                                    <div className="cart-item-bar">
                                        <AddToCartBtn
                                            cartItems={props.cartItems}
                                            cartProducts={props.cartProducts}
                                            item={item}
                                            token={props.token}
                                            isAuthenticated={props.isAuthenticated}
                                            showAlarmWindowAction={props.showAlarmWindowAction}
                                            addItemToCartItem={props.addItemToCartItem}
                                        />




                                    </div> {/*end of cart-item-bar */}
                                </div>





                                {/*cart-item */}
                            </div>
                        })} </table> : <div className="loader" />}








            </div>
        </div>
    );
}



const mapStateToProps = (state) => {
    return {

        
        ProductsOfCart: state.cartProductsReducer.cartProducts,
        isLoading: state.cartProductsReducer.isLoading,
        productsFetched: state.categoryReducer.productsFetched,
        productsIsFetching: state.categoryReducer.productsIsFetching,
        products: state.categoryReducer.products,
        showAlarmWindow: state.hintBoxReducer.alarmWindow.show,
        RefreshToken: state.userAuth.authUser.refreshToken,
        token: state.userAuth.authUser.token,
        isAuthenticated: state.userAuth.authUser.isAuthenticated,
        FavoritesList: state.FavAndSeenReducer.favorites.list,
        cartItems: selectCartItems(state),
        cartProducts: state.cartProductsReducer.cartProducts,


    }
}





export default withRouter(connect(mapStateToProps, actions)(SearchProducts))