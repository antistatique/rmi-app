import * as actions from './fatality-reports-actions';
import initialState from './fatality-reports-initial-state';

export default {
  [actions.setFatalityReports]: (state, { payload }) => ({ ...state, list: payload }),
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
