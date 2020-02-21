import { createAction } from 'redux-tools';

export const setFilters = createAction('adverse-impact-index-page/setFilters');
export const resetFilters = createAction('adverse-impact-index-page/resetFilters');

export default {
  setFilters,
  resetFilters
};
