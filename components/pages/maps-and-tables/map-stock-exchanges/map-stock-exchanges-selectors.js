import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import { paths } from 'components/common/map/map-helpers';

import { EXCLUDED_COUNTRIES } from 'constants/map';

const companies = state => state.companies.list;
const stockExchanges = state => state.stockExchanges.list;
const selectedCompany = state => state.mapsAndTables.stockExchangesFilters.company;
const countries = state => state.countries.list;

export const getSelectedCompany = createSelector(
  [companies, selectedCompany],
  (_companies, _selectedCompany) => {
    return _companies.find(company => company.id === _selectedCompany);
  }
);

export const getCompanies = createSelector(
  companies,
  (_companies = []) => _companies.filter(company => company['stock-exchanges'].length > 0)
);

export const getCountries = createSelector(
  [countries, stockExchanges],
  (_countries = [], _stockExchanges = []) => {
    const selectedStockExchanges = uniqBy(_stockExchanges, 'country.id');
    const selectedCountries = selectedStockExchanges.map(stockExchange => stockExchange.country.id);
    return _countries.filter(country => selectedCountries.includes(country.id));
  }
);

export const getPaths = createSelector(
  [stockExchanges, getSelectedCompany],
  (_stockExchanges = [], _company = {}) =>
    paths.filter(p => !EXCLUDED_COUNTRIES.includes(p.properties.ISO_A3))
      .map((geography, index) => {
        const selectedStockExchanges = uniqBy(_stockExchanges, 'country.id');
        const iso = geography.properties.ISO_A3;
        const country = selectedStockExchanges.find(stockExchange => stockExchange.country.code === iso);
        let isHighlighted = undefined;

        if (_company['stock-exchanges'] && _company['stock-exchanges'].length > 0) {
          isHighlighted = _company['stock-exchanges'].find(stockExchange => stockExchange.country.code === iso);
        }

        return {
          ...geography,
          properties: {
            ...geography.properties,
            id: index,
            isClickable: country !== undefined,
            isSelected: false,
            isHighlighted: isHighlighted !== undefined ? isHighlighted.country.code === iso : false,
            countryId: country !== undefined ? country.country.id : undefined,
            isHome: country !== undefined,
            isProducing: false
          }
        };
      })
);
