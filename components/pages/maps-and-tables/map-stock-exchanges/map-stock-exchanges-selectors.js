import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import { paths } from 'components/common/map/map-helpers';
import compact from 'lodash/compact';

import { EXCLUDED_COUNTRIES } from 'constants/map';

const companies = state => state.companies.list;
const stockExchanges = state => state.stockExchanges.list;
const selectedCompany = state => state.companiesPage.selectedCompany;

export const getSelectedCompany = createSelector(
  [companies, selectedCompany],
  (_companies, _selectedCompany) => _companies.find(company => company.id === _selectedCompany)
);

export const getPaths = createSelector(
  [stockExchanges, getSelectedCompany],
  (_stockExchanges = [], _company = {}) =>
    paths.filter(p => !EXCLUDED_COUNTRIES.includes(p.properties.ISO_A3))
      .map((geography, index) => {
        const selectedStockExchanges = uniqBy(_stockExchanges, 'country.id');
        const iso = geography.properties.ISO_A3;
        const country = selectedStockExchanges.find(stockExchange => stockExchange.country.code === iso) || {};

        const {
          country: companyCountry,
          'secondary-country': companySecondaryCountry
        } = _company;

        // the countries we will hightlight when the user hovers a company
        const hihglightedCountries = compact([
          (companyCountry || {}).code,
          (companySecondaryCountry || {}).code
        ]);

        return {
          ...geography,
          properties: {
            ...geography.properties,
            id: index,
            isClickable: !(Object.keys(country).length === 0 && country.constructor === Object),
            isSelected: false,
            isHighlighted: country.country ? hihglightedCountries.includes(country.country.code) : false,
            countryId: country.country ? country.country.id : undefined,
            isHome: !(Object.keys(country).length === 0 && country.constructor === Object),
            isProducing: false
          }
        };
      })
)