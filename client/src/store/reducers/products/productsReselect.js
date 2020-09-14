import { createSelector } from 'reselect';

const selectProductsReducer = state => state.ProductsReducer;

export const selectProducts = createSelector(
  [selectProductsReducer] ,
  ProductsReducer => ProductsReducer.products
);

export const selectItem =(title) => createSelector(
  [selectProductsReducer] ,
  SelectItemByTitle => SelectItemByTitle.products.filter((product) =>{
    return product.name === title
  })
);