import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import { paths } from 'components/common/map/map-helpers';
import compact from 'lodash/compact';

import { EXCLUDED_COUNTRIES } from 'constants/map';

const taxJurisdictions = state => state.companies.taxJurisdictions;
const companies = state => state.companies.list;
const selectedCompany = state => state.companiesPage.selectedCompany;
const filterSelectedCompany = state => state.mapsAndTables.knownTaxFilters.company;
const selectedCountry = state => state.mapsAndTables.knownTaxFilters.country;

export const getSelectedCompany = createSelector(
  [companies, selectedCompany],
  (_companies, _selectedCompany) => _companies.find(company => company.id === _selectedCompany)
);

export const getPaths = createSelector(
  [taxJurisdictions, getSelectedCompany, filterSelectedCompany, selectedCountry],
  (_taxJurisdictions = [], _company = {}, _selectedCompany, _selectedCountry) =>
    paths.filter(p => !EXCLUDED_COUNTRIES.includes(p.properties.ISO_A3))
      .map((geography, index) => {
        const selectedTaxJurisdictions = uniqBy(_taxJurisdictions, 'country.id');
        const iso = geography.properties.ISO_A3;
        let country = {};
        if (_selectedCountry) {
          country = selectedTaxJurisdictions.filter(taxJurisdiction => taxJurisdiction.country.id === _selectedCountry).find(taxJurisdiction => taxJurisdiction.country.code === iso) || {};
        } else if (_selectedCompany) {
          country = selectedTaxJurisdictions.find(taxJurisdiction => taxJurisdiction.country.code === iso && taxJurisdiction.company.id === _selectedCompany) || {};
        } else {
          country = selectedTaxJurisdictions.find(taxJurisdiction => taxJurisdiction.country.code === iso) || {};
        }

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
            countryId: country.country ? country.country.id : 1,
            isHome: !(Object.keys(country).length === 0 && country.constructor === Object),
            isProducing: false
          }
        };
      })
);

export default { getPaths };
