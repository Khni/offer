import { createSelector } from 'reselect';

const selectProductsReducer = state => state.ProductsReducer;

export const selectProducts = createSelector(
  [selectProductsReducer] ,
  ProductsReducer => ProductsReducer.products
);