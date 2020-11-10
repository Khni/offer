import axios from 'axios';
import { FETCH_PRODUCTS ,
  FETCH_CATEGORY ,
  FETCH_SECTIONS, 
  FETCH_SECTIONS_WITH_PRODUCTS,
  FETCH_COLLECTIONS, 
  FETCH_CATEGORY_ERROR ,
  FETCH_PRODUCTS_ERROR, 
  FETCH_SECTIONS_ERROR, 
  FETCH_ERROR, 
  ADDED_TO_SERVER, 
  ADDED_TO_SERVER_ERROR, 
  PRODUCTS_IS_FETCHING, 
  SECTIONS_IS_FETCHING, 
  CATEGORIES_IS_FETCHING, 
  COLLECTIONS_IS_FETCHING, 
  ADDING_PRODUCT, 
  PRODUCT_FETCHED

  } from '../types'
import * as actionTypes from "../types";
import * as APIs from './APIs'
import * as calls from './axiosCalls'

export const fetchCategories = () => {


    return async dispatch => {
      try {
     const response =   await axios.get('/api/categoriesWithAll');
  console.log('response' +response.data.CategoriesWithSectionsAndProducts);
  
        dispatch({
          type: FETCH_CATEGORY, 
          Categories : response.data.CategoriesWithSectionsAndProducts
          
        });
       
      } catch(err) {
      // console.log();
          console.error("err"+ err.response.data.error)
        dispatch({
          type: FETCH_ERROR,
     //     payload: err.response.data.error
        })
      }
    };
  }
  
  export const addCategoryToServer = (data, adminToken) => {
 
 
    return async dispatch => {
      try {
     const response =   await axios.post('/api/category/add', data, {
      headers : { Authorization: `Bearer ${adminToken}`
       }} );
  console.log('response' +response.data.CategoriesWithSectionsAndProducts);
  
        dispatch({
          type: ADDED_TO_SERVER
          
        });
       
      } catch(err) {
      // console.log();
          console.error("err"+ err.response.data.error)
        dispatch({
          type: ADDED_TO_SERVER_ERROR,
          error: err.response.data.error
        })
      }
    };
  }




export const fetchSections = () => {


    return async dispatch => {
      try {
     const response =   await axios.get('/api/sections');
 // console.log('response' +response.data.sections);
  
        dispatch({
          type: FETCH_SECTIONS, 
          Sections : response.data.sections

          
        });
       console.log("log  from fetchSections");
      } catch(err) {
      // console.log();
          console.error("err"+ err)
        dispatch({
          type: FETCH_ERROR,
       //   payload: err.response.data.error
        })
      }
    };
  }


  export const fetchSectionsWithProducts = () => {


    return async dispatch => {
      try {
     const response =   await axios.get('/api/sections-with-products');
 // console.log('response' +response.data.sections);
  
        dispatch({
          type: FETCH_SECTIONS_WITH_PRODUCTS, 
          sections : response.data.SectionsWithProducts

          
        });
       console.log("log  from fetchSections");
      } catch(err) {
      // console.log();
          console.error("err"+ err)
        dispatch({
          type: FETCH_ERROR,
       //   payload: err.response.data.error
        })
      }
    };
  }


export const addSectionToServer = (data, adminToken) => {


    return async dispatch => {
      try {
     const response =   await axios.post('/api/section/add', data, {
      headers : { Authorization: `Bearer ${adminToken}`
       } });
  console.log('response' +response.data);
  
        dispatch({
          type: ADDED_TO_SERVER
          
        });
       
      } catch(err) {
      // console.log();
          console.error("err"+ err.response.data.error)
        dispatch({
          type: ADDED_TO_SERVER_ERROR,
          error: err.response.data.error
        })
      }
    };
  }





export const fetchProducts= (isFetching) => {


    return async dispatch => {
      console.log("before Start"+isFetching);
    dispatch({
          type: PRODUCTS_IS_FETCHING
          
          
        });
    console.log("after Start"+isFetching);
    
      try {
     const response =   await axios.get('/api/products');
  console.log('response' );
  
  //setTimeout(() => {
    dispatch({
          type: FETCH_PRODUCTS, 
          Products : response.data.products
          
        });
  //}, 3000);
  
  
  console.log("after fetch Start"+isFetching);
       
      } catch(err) {
      // console.log();
        //  console.error("err"+ err.response.data.error)
        dispatch({
          type: FETCH_ERROR,
      //    payload: err.response.data.error
        })
      }
    };
  }


export const addProductToServer = (data, adminToken) => {


    return async dispatch => {
    	
    dispatch({
          type: ADDING_PRODUCT
          
        });
    
      try {
     const response =   await axios.post('/api/add/product', data, {
      headers : { Authorization: `Bearer ${adminToken}`
     // Accept: 'application/json',
     // 'content-type': `multipart/form-data; boundary=${data._boundary}`

      
       } });
  console.log('added product succefully' );
  
        dispatch({
          type: ADDED_TO_SERVER
          
        });
       
      } catch(err) {
      // console.log();
          console.error("err"+ err.response)
        dispatch({
          type: ADDED_TO_SERVER_ERROR,
          error: err.response.data.error
        })
      }
    };
  }
  
  
  
 
  export const fetchCollections= () => {


    return async dispatch => {
      try {
     const response =   await axios.get('/api/collections');
  console.log('response' +response.data.collections);
  
        dispatch({
          type: FETCH_COLLECTIONS, 
          Collections : response.data.collections
          
        });
       
      } catch(err) {
      // console.log();
          console.error("err"+ err.response.data.error)
        dispatch({
          type: FETCH_ERROR,
      //    payload: err.response.data.error
        })
      }
    };
  }


export const addCollectionToServer = (data, adminToken) => {


    return async dispatch => {
      try {
     const response =   await axios.post('/api/collection/add', data, {
      headers : { Authorization: `Bearer ${adminToken}`
       }} );
  console.log('response' +response.data);
  
        dispatch({
          type: ADDED_TO_SERVER, 
          
        });
       
      } catch(err) {
      // console.log();
          console.error("err"+ err.response.data.error)
        dispatch({
          type: ADDED_TO_SERVER_ERROR,
          error: err.response.data.error
        })
      }
    };
  }
  
  
  
  
  export const productsFetched =  ()  =>({
  type: PRODUCT_FETCHED
});


export const fetchFavorites = (token) =>{
	return async dispatch => {
	
  dispatch({
         type: actionTypes.FRTCH_FAVORITES_START
      });
  let url = APIs.GET_USER_FAVORITES
  try {
    let response = await calls.getDataHeaderAuth(url,token) 
  
    dispatch({
         type: actionTypes.FRTCH_FAVORITES_SUCCESS, 
         list: response.data.favoriteProducts
      });
  } catch (error) {
    dispatch({
         type: actionTypes.FRTCH_FAVORITES_ERROR, 
         error: error.response.data.error
      });
  }
}
} 


