import { createAction } from 'redux-tools';

export const setProducingCountriesFilters = createAction('mapsAndTables/setProducingCountriesFilters');
export const resetProducingCountriesFilters = createAction('mapsAndTables/resetProducingCountriesFilters');
export const setKnownTaxFilters = createAction('mapsAndTables/setKnownTaxFilters');
export const resetKnownTaxFilters = createAction('mapsAndTables/resetKnownTaxFilters');
export const setStockExchangesFilters = createAction('mapsAndTables/setStockExchangesFilters');
export const resetStockExchangesFilters = createAction('mapsAndTables/resetStockExchangesFilters');
export const setTailingStorageFacilitiesFilters = createAction('mapsAndTables/setTailingStorageFacilitiesFilters');
export const resetTailingStorageFacilitiesFilters = createAction('mapsAndTables/resetTailingStorageFacilitiesFilters');

export default {
  setProducingCountriesFilters,
  resetProducingCountriesFilters,
  setKnownTaxFilters,
  resetKnownTaxFilters,
  setStockExchangesFilters,
  resetStockExchangesFilters,
  setTailingStorageFacilitiesFilters,
  resetTailingStorageFacilitiesFilters
};
