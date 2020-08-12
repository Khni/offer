import { 
    FETCH_PRODUCTS ,
  FETCH_CATEGORY ,
  FETCH_SECTIONS, 
  FETCH_COLLECTIONS, 
  FETCH_ERROR, 
  FETCH_CATEGORY_ERROR ,
  FETCH_PRODUCTS_ERROR, 
  FETCH_SECTIONS_ERROR, 
  FETCH_COLLECTIONS_ERROR
  ADDED_TO_SERVER, 
  ADDED_TO_SERVER_ERROR
      } from '../../types/productsTypes'


    const INITIAL_STATE = {
        categories: [], 
  
        sections: [], 
        
        products:[], 
        
        collections:[], 
        FetchError: false, 
        AddToServer: {
        	added: false, 
            error:'' 
         } 
      };
      
      const CategoriesReducer = (state = INITIAL_STATE, action) => {
        switch (action.type) {
          case FETCH_CATEGORY :
            return {
           ...state, 
           categories: action.Categories
             
            };
            
          
  
            case FETCH_SECTIONS :
            return {
           ...state, 
           sections: action.Sections
             
            };
            
            
            
            case FETCH_PRODUCTS :
            return {
           ...state, 
           products: action.Products
             
            };
            case FETCH_COLLECTIONS :
            return {
           ...state, 
           collections: action.Collections
             
            };
            case FETCH_ERROR :
            return {
           ...state, 
           FetchError: true
             
            };
            
            
            case ADDED_TO_SERVER :
            return {
           ...state, 
           AddToServer: {
        	added: true, 
            error:'' 
         } 
             
            };
            
            case ADDED_TO_SERVER_ERROR :
            return {
           ...state, 
           AddToServer: {
        	added: false, 
            error: action.error
         } 
             
            };
            
            
          default:
            return state;
        }
      };
      
      export default CategoriesReducer;