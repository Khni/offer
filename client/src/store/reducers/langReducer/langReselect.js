import { createSelector } from 'reselect';

const selectLangReducer = state => state.langReducer;

export const selectAuthLang = createSelector(
  selectLangReducer,
  langReducer => langReducer.auth
);
export const selectLang = createSelector(
  selectLangReducer,
  langReducer => langReducer.lang
);