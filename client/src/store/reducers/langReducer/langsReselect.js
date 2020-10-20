import { createSelector } from 'reselect';

const selectLangsReducer = state => state.langsReducer;

export const selectTermsLang = createSelector(
  selectLangsReducer,
  langsReducer => langsReducer.terms
);
export const selectLang = createSelector(
  selectLangsReducer,
  langsReducer => langsReducer.lang
);