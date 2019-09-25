import * as actions from './adverse-impacts-actions';
import initialState from './adverse-impacts-initial-state';

export default {
  [actions.setAdverseImpacts]: (state, { payload }) => ({ ...state, list: payload }),
  [actions.setAdverseImpactsLoading]: (state, { payload }) => ({ ...state, loading: payload }),
  [actions.setAdverseImpactsError]: (state, { payload }) => ({ ...state, error: payload }),
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
