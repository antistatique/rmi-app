import * as actions from './adverse-impacts-actions';
import initialState from './adverse-impacts-initial-state';

export default {
  [actions.setFilters]: (state, { payload }) => ({
    ...state,
    filters: {
      ...state.filters,
      ...payload
    }
  }),
  [actions.resetFilters]: state => ({ ...state, filters: initialState.filters })
};
