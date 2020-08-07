import axios from 'axios';
import { FETCH_PRODUCTS ,
  FETCH_CATEGORY ,
  FETCH_CATEGORY_ERROR ,
  FETCH_PRODUCTS_ERROR  } from '../types/productsTypes'


export const fetchCategories = () => {


    return async dispatch => {
      try {
     const response =   await axios.get('http://localhost:8080/categories');
  console.log('response' +response.data.CategoriesWithSectionsAndProducts);
  
        dispatch({
          type: FETCH_CATEGORY, 
          Categories : response.data.CategoriesWithSectionsAndProducts,
          
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
