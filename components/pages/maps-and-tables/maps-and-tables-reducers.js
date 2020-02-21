import * as actions from './maps-and-tables-actions';
import initialState from './maps-and-tables-initial-state';

export default {
  [actions.setProducingCountriesFilters]: (state, { payload }) => ({
    ...state,
    producingCountriesFilters: {
      ...state.producingCountriesFilters,
      ...payload
    }
  }),
  [actions.resetProducingCountriesFilters]: state => ({
    ...state,
    producingCountriesFilters: initialState.producingCountriesFilters
  }),
  [actions.setKnownTaxFilters]: (state, { payload }) => ({
    ...state,
    knownTaxFilters: {
      ...state.knownTaxFilters,
      ...payload
    }
  }),
  [actions.resetKnownTaxFilters]: state => ({
    ...state,
    knownTaxFilters: initialState.knownTaxFilters
  }),
  [actions.setStockExchangesFilters]: (state, { payload }) => ({
    ...state,
    stockExchangesFilters: {
      ...state.stockExchangesFilters,
      ...payload
    }
  }),
  [actions.resetStockExchangesFilters]: state => ({
    ...state,
    stockExchangesFilters: initialState.stockExchangesFilters
  })
};
