import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

const stockExchanges = state => state.stockExchanges.list;
const countries = state => state.countries.list;

export const getCountries = createSelector(
  [countries, stockExchanges],
  (_countries = [], _stockExchanges = []) => {
    const selectedStockExchanges = uniqBy(_stockExchanges, 'country.id');
    const selectedCountries = selectedStockExchanges.map(stockExchange => stockExchange.country.id);
    const tempCountries = _countries.filter(country => selectedCountries.includes(country.id));
    return tempCountries.map(country => ({ label: country.name, value: country.id }));
  }
);
