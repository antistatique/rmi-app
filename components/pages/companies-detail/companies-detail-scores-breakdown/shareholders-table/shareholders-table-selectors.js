import { createSelector } from 'reselect';

const shareholders = state => state.shareholders.list;

export const getSortedShareholders = createSelector(
  [shareholders],
  (_shareholders = []) => 
    _shareholders.sort((a, b) => (a['percent-shares'] > b['percent-shares']) ? -1 : 1)
);

export default { getSortedShareholders };
