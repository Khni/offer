import { createSelector } from 'reselect';

const selectLang = state => state.langReducer;

export const selectAuthLang = createSelector(
  [selectLang],
  langReducer => langReducer.auth
);
export const selectLang = createSelector(
  [selectLang],
  langReducer => langReducer.lang
);