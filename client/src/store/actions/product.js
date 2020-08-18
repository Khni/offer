import axios from 'axios';
import { FETCH_PRODUCTS ,
  FETCH_CATEGORY ,
  FETCH_SECTIONS, 
  FETCH_COLLECTIONS, 
  FETCH_CATEGORY_ERROR ,
  FETCH_PRODUCTS_ERROR, 
  FETCH_SECTIONS_ERROR, 
  FETCH_ERROR, 
  ADDED_TO_SERVER, 
  ADDED_TO_SERVER_ERROR
  

  } from '../types/productsTypes'


export const fetchCategories = () => {


    return async dispatch => {
      try {
     const response =   await axios.get('http://localhost:8080/categories');
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
     const response =   await axios.post('http://localhost:8080/category/add', data, {
      headers : { Authorization: `Bearer ${adminToken}`
       }} );
  console.log('response' +response.data.CategoriesWithSectionsAndProducts);
  
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




export const fetchSections = () => {


    return async dispatch => {
      try {
     const response =   await axios.get('http://localhost:8080/sections');
  console.log('response' +response.data.sections);
  
        dispatch({
          type: FETCH_SECTIONS, 
          Sections : response.data.sections

          
        });
       
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
     const response =   await axios.get('http://localhost:8080/section/add', data, {
      headers : { Authorization: `Bearer ${adminToken}`
       } });
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





export const fetchProducts= () => {


    return async dispatch => {
      try {
     const response =   await axios.get('http://localhost:8080/sections');
  console.log('response' +response.data.sections);
  
        dispatch({
          type: FETCH_PRODUCTS, 
          Products : response.data.products
          
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


export const addProductToServer = (data, adminToken) => {


    return async dispatch => {
      try {
     const response =   await axios.post('http://localhost:8080/product/add', data, {
      headers : { Authorization: `Bearer ${adminToken}`
       } });
  console.log('response' );
  
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
     const response =   await axios.get('http://localhost:8080/collections');
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
     const response =   await axios.get('http://localhost:8080/collection/add', data, {
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
  
  
  
  
  



