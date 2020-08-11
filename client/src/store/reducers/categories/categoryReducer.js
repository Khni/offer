import { 
    FETCH_PRODUCTS ,
  FETCH_CATEGORY ,
  FETCH_SECTIONS, 
  FETCH_CATEGORY_ERROR ,
  FETCH_PRODUCTS_ERROR, 
  FETCH_SECTIONS_ERROR
      } from '../../types/productsTypes'


    const INITIAL_STATE = {
        categories: [], 
        sections: [], 
        products:[] 
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
            
            
          default:
            return state;
        }
      };
      
      export default CategoriesReducer;