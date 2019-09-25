import * as actions from './stock-exchanges-actions';

export default {
  [actions.setStockExchanges]: (state, { payload }) => ({ ...state, list: payload })
};
