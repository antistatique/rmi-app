import * as actions from './table-mine-sites-actions';
import initialState from './table-mine-sites-initial-state';

export default {
  [actions.setFilters]: (state, { payload }) => ({
    ...state,
    filters: {
      ...state.filters,
      ...payload
    }
  }),
  [actions.resetFilters]: state => ({ ...state, filters: initialState.filters }),
  [actions.setPaginationPage]: (state, { payload }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      page: payload
    }
  }),
  [actions.setPaginationSize]: (state, { payload }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      size: payload
    }
  }),
  [actions.setPaginationLimit]: (state, { payload }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      limit: payload
    }
  }),
  [actions.resetPagination]: state => ({ ...state, pagination: initialState.pagination })
};
