
import * as actions from './results-overall-actions';
import initialState from './results-overall-initial-state';

export default {
  [actions.setScores]: (state, { payload }) => ({
    ...state,
    [payload.key]: {
      ...state[payload.key],
      list: payload.value
    }
  }),
  [actions.setLoadingScores]: (state, { payload }) => ({
    ...state,
    [payload.key]: {
      ...state[payload.key],
      loading: payload.value
    }
  }),
  [actions.setSelectedCompany]: (state, { payload }) => ({ ...state, selectedCompany: payload }),
  [actions.resetSelectedCompany]: state =>
    ({ ...state, selectedCompany: initialState.selectedCompany })
};
