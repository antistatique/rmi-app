import * as actions from './categories-actions';

export default { [actions.setCategories]: (state, { payload }) => ({ ...state, list: payload }) };
