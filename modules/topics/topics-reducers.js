import * as actions from './topics-actions';

export default { [actions.setTopics]: (state, { payload }) => ({ ...state, list: payload }) };
