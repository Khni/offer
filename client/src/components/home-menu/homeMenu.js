import React, { Component } from 'react';
import './homeMenu.css';
import { selectProducts } from '../../store/reducers/products/productsReselect'
import * as actions from '../../store/actions';
import * as Calls from '../../store/actions/axiosCalls'
import Header from '../headd/header/header'
import Section from '../section/section.js';
import Searchbox from '../searchbox/searchbox.component'

import { connect } from 'react-redux';

class homeMenu extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      search: '',
      Loading: false,
      favorites: [],
      favorite: false,
      items: []
    }
  }

  searchUpdate(event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }



  // async ToggleFavorite(productID) {
  //   console.log("from toggle favorit");
  //   this.setState({ favorite: !this.state.favorite })
  //   try {
  //     const response = await Calls.postDataHeaderAuth('/api/favorite/addanddelete', { productID: productID }, this.props.token)
     
  //     console.log("response" + response);
  //     console.log("prepar for axiosinsT");
  //   } catch (e) {
  //     if (e) {
  //       this.setState({ favorite: !this.state.favorite })

  //     }
  //   }
  // }


  async productsObject() {

    let products = this.props.sectionsWithProducts

    if (!this.props.token) {

      return this.setState({ items: products, Loading: false })

    }


    await this.props.favoriteListAction(this.props.token,this.props.RefreshToken,this.props.refreshToken)
    this.setState({ favorites: this.props.FavoritesList })

    let productsWithFav = products.map((product) => {

      return {
        ...product, productsOfSection: product.productsOfSection.map((pos) => {
          const fav = this.state.favorites.find((favorite) => favorite._id === pos._id)
         // let Favorite = false
          if (fav) {
            this.setState({ favorite: true })
          } else {
            this.setState({ favorite: false })
          }

          return { ...pos, isFav: this.state.favorite }
        })
      }

    })


    this.setState({ items: productsWithFav })

    this.setState({ Loading: false })
   

  }




  async FetchSectionsFromServer() {
    if (!this.props.sectionsWithProductsFetched) {
      this.setState({ Loading: true })
      const { fetchSectionsWithProducts } = this.props;
      await fetchSectionsWithProducts();
      //  this.setState({Loading: false})
    }
    console.log("log from add product Updatefetchproduct")

  }

  async componentDidMount() {

  console.log("homemenu 2");
  // await this.props.authCheck(this.props.token,this.props.RefreshToken)
  /*  try{
      const response = await calls.postDataHeaderAuth('/api/user/refreshToken',{ token: this.props.token}, this.props.RefreshToken )
      console.log("resAuth v2" +response.status );
      if(response.status== 201) {
        console.log("status created");
        console.log("res token "+JSON.stringify(response) );
  await this.props.refreshToken(response.data.token, response.data.refreshToken)
     } 
     } catch(e) {
       console.log("e" +e.response.data.error);
  this.props.logout()
  } */




    //console.log("favoritelist" + this.props.FavoritesList);
    let lang = window.navigator.languages ? window.navigator.languages[0] : null;
    lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;

    let shortLang = lang;
    if (shortLang.indexOf('-') !== -1)
      shortLang = shortLang.split('-')[0];

    if (shortLang.indexOf('_') !== -1)
      shortLang = shortLang.split('_')[0];

   // console.log("lang" + lang + shortLang);
    //console.log("window navigator" + navigator.userAgent);
    await this.FetchSectionsFromServer()

    this.productsObject()
  }


  async componentDidUpdate(prevProps, prevState) {
    
    if (!prevState.Loading) {
      await this.FetchSectionsFromServer()
    }
  }




  render() {
    // testing
    // let lang = window.navigator.languages ? window.navigator.languages[0] : null;
    // lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;

    // let shortLang = lang;
    // if (shortLang.indexOf('-') !== -1)
    //   shortLang = shortLang.split('-')[0];

    // if (shortLang.indexOf('_') !== -1)
    //   shortLang = shortLang.split('_')[0];

    // function isFacebookApp() {
    //   var ua = navigator.userAgent || navigator.vendor || window.opera;
    //   return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
    // }
    //for instgram  (ua.indexOf('Instagram') > -1)
    //testing




 
    
    


    return (
      <div className="menu-container">

        <Header searchbox={false}
          SearchVal={this.state.search}
          SearchChange={this.searchUpdate} 
          />
          
          <input onClick={()=> this.props.history.push('/search')} className="input-search-main" type='text' placeholder="search....." />
    {/*    <Searchbox />*/} 
        {/* testing */}
        {/* <p>"window navigator" +{ navigator.userAgent}</p>
<p>{"lang: "+lang+" short: " + shortLang}</p>
<p>{isFacebookApp() ? "fb" : "broswer"}</p>
<p>{"fbapp: " +isFacebookApp()}</p> */}
        {/* testing */}
        {!this.state.Loading ? <div className="full-menu">
          {this.state.items.map((col) =>
            <Section key={col._id} favorite={this.state.favorite} items={col.productsOfSection} title={col.nameEn}/>
          )}
        </div> :





          <div className="loaderHome" />}


      </div>

    );

  }





}



const mapDispatchToProps = dispatch => ({
 // addItem: item => dispatch(actions.addItem(item)),
  //addItemToCartItem: (item, items) => dispatch(actions.addItemToCartItem(item, items)),
  fetchSectionsWithProducts: () => dispatch(actions.fetchSectionsWithProducts()),
  favoriteListAction: (token,refreshToken,refreshTokenFunc) => dispatch(actions.fetchFavorites(token,refreshToken,refreshTokenFunc)),
  refreshToken: (token, refreshToken) => dispatch(actions.refreshToken(token,refreshToken)),
  logout: () => dispatch(actions.logout()),
  authCheck: async (token, refreshToken) => dispatch(actions.authCheck(token,refreshToken)),
  toggleHintBox: (msg) => dispatch(actions.toggleHintBox(msg)),

});

const mapStateToProps = (state) => {
  return {
    FavoritesList: state.FavAndSeenReducer.favorites.list,
    token: state.userAuth.authUser.token,
    RefreshToken: state.userAuth.authUser.refreshToken,
    collections: selectProducts(state),
    productsLoading: state.categoryReducer.productsLoading,
    categories: state.categoryReducer.categories,
    sectionsWithProductsFetched: state.categoryReducer.sectionsWithProductsFetched,
    sectionsWithProducts: state.categoryReducer.sectionsWithProducts
    //collections: state.ProductsReducer.products
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(homeMenu);