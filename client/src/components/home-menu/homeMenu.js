import React , {Component} from 'react';
import './homeMenu.css';
import {selectProducts} from '../../store/reducers/products/productsReselect'
import * as actions from '../../store/actions/product';
import Header from '../headd/header/header'
import Section from '../section/section.js';
import Searchbox from '../searchbox/searchbox.component'
import { connect } from 'react-redux';

class homeMenu extends Component {
	constructor(props){
		super(props);
	
	this.state = {
	  search: '',
	  Loading: false, 
	favorites : [],
    items: [] 
    }
  }

  searchUpdate(event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }
  
  
  
  productsObject() {
let products = this.props.sectionsWithProducts
let productsWithFav = products.map((product)=> {
	
	return product.productsOfSection.map((pos)=>{
const fav = this.state.favorites.find((favorite) => favorite._id == product._id)
let Favorite = false
  if (fav) {
    Favorite = true
  } else {
    Favorite= false
  }

return {...pos, isFav: Favorite} 
} )




} )

this.setState({items: productsWithFav})
  

} 
  
  
  
  
  async FetchSectionsFromServer(){
     if(!this.props.sectionsWithProductsFetched) {
   this.setState({Loading: true})
     const { fetchSectionsWithProducts } = this.props;
     await fetchSectionsWithProducts();
     this.setState({Loading: false})
    }
     console.log("log from add product Updatefetchproduct" )
       
   }
  
  async componentDidMount() {
    let lang = window.navigator.languages ? window.navigator.languages[0] : null;
    lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;

let shortLang = lang;
if (shortLang.indexOf('-') !== -1)
    shortLang = shortLang.split('-')[0];

if (shortLang.indexOf('_') !== -1)
    shortLang = shortLang.split('_')[0];

console.log("lang"+lang+ shortLang);
console.log("window navigator" + navigator.userAgent);
await this.FetchSectionsFromServer()
await this.props.favoriteListAction(this.props.token)
  this.setState({favorites: this.props.FavoritesList})
  this.productsObject()
  }
  async componentDidUpdate(prevProps, prevState) {
    console.log("prevState:" + prevState.Loading);
    if (!prevState.Loading) {
 await this.FetchSectionsFromServer()
    }
   }
  
  
  
  
  render() 
  
  {
   // testing
    let lang = window.navigator.languages ? window.navigator.languages[0] : null;
    lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;

let shortLang = lang;
if (shortLang.indexOf('-') !== -1)
    shortLang = shortLang.split('-')[0];

if (shortLang.indexOf('_') !== -1)
    shortLang = shortLang.split('_')[0];

    function isFacebookApp() {
      var ua = navigator.userAgent || navigator.vendor || window.opera;
      return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
  }
//for instgram  (ua.indexOf('Instagram') > -1)
//testing




		let {collections} =this.props
		let {categories} = this.props
		let collectionsFiltered = collections.flatMap((collection)=>collection.items).filter((item)=>
item.name.indexOf(this.state.search) !== -1) 
		
		
		
		return(
		<div className="menu-container">
		
		  <Header searchbox={true}
          SearchVal={this.state.search} 
           SearchChange={this.searchUpdate} />
           <Searchbox />
          {/* testing */}
{/* <p>"window navigator" +{ navigator.userAgent}</p>
<p>{"lang: "+lang+" short: " + shortLang}</p>
<p>{isFacebookApp() ? "fb" : "broswer"}</p>
<p>{"fbapp: " +isFacebookApp()}</p> */}
          {/* testing */}
		   {!this.state.Loading 	<div className="full-menu">
		{this.props.sectionsWithProducts.map((col)=>
  <Section key={col._id}  items={col.productsOfSection} title={col.nameEn} />
    )}
		</div>: 
    
    
    
    
    
    <div className="loaderHome"/> }
  
  
         </div>
  
		);
		
	}
	
	 
	
	
	
}





const mapStateToProps =(state) =>{
	return {
		token: state.userAuth.authUser.token,
 collections: selectProducts(state), 
 productsLoading: state.categoryReducer.productsLoading, 
 categories : state.categoryReducer.categories,
 sectionsWithProductsFetched: state.categoryReducer.sectionsWithProductsFetched,
 sectionsWithProducts: state.categoryReducer.sectionsWithProducts
 //collections: state.ProductsReducer.products
	}
}

export default connect(mapStateToProps, actions)(homeMenu);