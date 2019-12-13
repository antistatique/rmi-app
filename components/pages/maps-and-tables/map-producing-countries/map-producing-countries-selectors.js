import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import { paths } from 'components/common/map/map-helpers';

import { EXCLUDED_COUNTRIES } from 'constants/map';

const companies = state => state.companies.list;
const selectedCompany = state => state.mapsAndTables.producingCountriesFilters.company;
const selectedCountry = state => state.mapsAndTables.producingCountriesFilters.country;
const countries = state => state.countries.list;

export const getSelectedCompany = createSelector(
  [companies, selectedCompany],
  (_companies, _selectedCompany) => _companies.find(company => company.id === _selectedCompany)
);

export const getSelectedCountry = createSelector(
  [countries, selectedCountry],
  (_countries, _selectedCountry) => _countries.find(country => country.id === _selectedCountry)
);

export const getCompanies = createSelector(
  (companies),
  (_companies = []) => _companies.filter(company => company['producing-countries'].length > 0)
);

export const getCountries = createSelector(
  [countries, companies],
  (_countries = [], _companies = []) => {
    const filteredCompanies = _companies.filter(company => company['producing-countries'].length > 0);
    const tempProducingCountries = filteredCompanies.map(company => company['producing-countries']);
    const tempCountries = uniqBy(tempProducingCountries, 'id')[0];
    const producingCountries = tempCountries.map(country => country.id);
    return _countries.filter(country => producingCountries.includes(country.id));
  }
);

export const getPaths = createSelector(
  [companies, getSelectedCompany, getSelectedCountry],
  (_companies = [], _selectedCompany, _selectedCountry) => {
    return paths.filter(p => !EXCLUDED_COUNTRIES.includes(p.properties.ISO_A3))
      .map((geography, index) => {
        const filteredCompanies = _companies.filter(company => company['producing-countries'].length > 0);
        const producingCountries = filteredCompanies.map(company => company['producing-countries']);
        const tempCountries = uniqBy(producingCountries, 'id')[0];
        const iso = geography.properties.ISO_A3;
        const country = tempCountries.find(tempCountry => tempCountry.code === iso);
        let isHighlighted = undefined;

        if (_selectedCompany && _selectedCompany['producing-countries'].length > 0) {
          isHighlighted = _selectedCompany['producing-countries'].find(producingCountry => producingCountry.code === iso);
        }

        if (!isHighlighted && _selectedCountry) {
          isHighlighted = _selectedCountry.code === iso;
        }

        return {
          ...geography,
          properties: {
            ...geography.properties,
            id: index,
            isClickable: country !== undefined,
            isSelected: false,
            isHighlighted: isHighlighted !== undefined && isHighlighted !== false,
            countryId: country !== undefined ? country.id : undefined,
            isHome: country !== undefined,
            isProducing: false
          }
        };
      });
  }
);
