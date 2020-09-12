import { 
    FETCH_PRODUCTS ,
  FETCH_CATEGORY ,
  FETCH_SECTIONS, 
  FETCH_COLLECTIONS, 
  FETCH_ERROR, 
  FETCH_CATEGORY_ERROR ,
  FETCH_PRODUCTS_ERROR, 
  FETCH_SECTIONS_ERROR, 
  FETCH_COLLECTIONS_ERROR,
  ADDED_TO_SERVER, 
  ADDED_TO_SERVER_ERROR, 
  PRODUCTS_IS_FETCHING, 
  SECTIONS_IS_FETCHING, 
  CATEGORIES_IS_FETCHING, 
  COLLECTIONS_IS_FETCHING
      } from '../../types/productsTypes'


    const INITIAL_STATE = {
        categories: [], 
        categoriesFetched: false,
        categoriesIsFetching: false,
        
        sections: [], 
        sectionsFetched: false, 
        sectionsIsFetching: false,
        
        products:[], 
        productsFetched: false, 
        productsIsFetching: false,
        
        collections:[], 
        collectionsFetched: false,
        collectionsIsFetching: false,
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
           categories: action.Categories,
           categoriesFetched: true, 
           categoriesIsFetching: false
             
            };
            
          
            
  
            case FETCH_SECTIONS :
            return {
           ...state, 
           sections: action.Sections, 
           sectionsFetched: true, 
           sectionsIsFetching: false
             
            };
            
            
            
            case FETCH_PRODUCTS :
            return {
           ...state, 
           products: action.Products, 
           productsFetched: true, 
           productsIsFetching: false 
            };
            case FETCH_COLLECTIONS :
            return {
           ...state, 
           collections: action.Collections,
           collectionsFetched: true, 
           collectionsIsFetching: false 
             
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
            
            case CATEGORIES_IS_FETCHING :
            return {
           ...state, 
           categoriesIsFetching: true
             
            };
            
            case COLLECTIONS_IS_FETCHING :
            return {
           ...state, 
           collectionsIsFetching: true
             
            };
            
            case SECTIONS_IS_FETCHING :
            return {
           ...state, 
           sectionsIsFetching: true
             
            };
            
            
            case PRODUCTS_IS_FETCHING :
            return {
           ...state, 
           productsIsFetching: true
             
            };
            
            
            
            
          default:
            return state;
        }
      };
      
      export default CategoriesReducer;