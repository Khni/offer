import { 
    FETCH_CATEGORY ,
    FETCH_CATEGORY_ERROR 
      } from '../../types/productsTypes'


    const INITIAL_STATE = {
        categories: []
      };
      
      const CategoriesReducer = (state = INITIAL_STATE, action) => {
        switch (action.type) {
          case FETCH_CATEGORY :
            return {
           ...state, 
           categories: action.categories
             
            };
            
          default:
            return state;
        }
      };
      
      export default CategoriesReducer;