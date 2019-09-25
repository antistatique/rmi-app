
import * as actions from './chart-actions';

export default {
  [actions.setPreviousYearVisibility]: (state, { payload }) => ({ ...state, isPrevYearVisible: payload })
};
