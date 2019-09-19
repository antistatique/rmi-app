import * as actions from './fatality-reports-actions';

export default {
  [actions.setFatalityReports]: (state, { payload }) => ({ ...state, list: payload })
};
