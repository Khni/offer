import axios from 'axios';
import { FETCH_PRODUCTS ,
  FETCH_CATEGORY ,
  FETCH_SECTIONS, 
  FETCH_CATEGORY_ERROR ,
  FETCH_PRODUCTS_ERROR, 
  FETCH_SECTIONS_ERROR

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
          type: FETCH_CATEGORY_ERROR,
          payload: err.response.data.error
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
          console.error("err"+ err.response.data.error)
        dispatch({
          type: FETCH_SECTIONS_ERROR,
          payload: err.response.data.error
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
          type: FETCH_SECTIONS_ERROR,
          payload: err.response.data.error
        })
      }
    };
  }

