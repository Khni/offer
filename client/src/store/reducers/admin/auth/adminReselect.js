import { createSelector } from 'reselect';

const selectAdmin = state => state.adminAuth;


export const selectAdminAuth = createSelector(
  selectAdmin, 
  adminAuth => adminAuth.authAdmin
);

