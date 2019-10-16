import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import { paths } from 'components/common/map/map-helpers';
import compact from 'lodash/compact';

import { EXCLUDED_COUNTRIES } from 'constants/map';

const companies = state => state.companies.list;
const currentCompany = state => state.companies.currentCompany;
const selectedCompany = state => state.companiesPage.selectedCompany;
const filteredSelectedCompany = state => state.mapsAndTables.producingCountriesFilters.company;
const selectedCountry = state => state.mapsAndTables.producingCountriesFilters.country;

export const getSelectedCompany = createSelector(
  [companies, selectedCompany],
  (_companies, _selectedCompany) => _companies.find(company => company.id === _selectedCompany)
);

export const getPaths = createSelector(
  [companies, currentCompany, getSelectedCompany, filteredSelectedCompany, selectedCountry],
  (_companies = [], _currentCompany, _company = {}, _selectedCompany, _selectedCountry) => {
    if (_currentCompany) {
      return paths.filter(p => !EXCLUDED_COUNTRIES.includes(p.properties.ISO_A3))
        .map((geography, index) => {
          const countries = _currentCompany['producing-countries'];
          const iso = geography.properties.ISO_A3;
          let country = {};
          if (_selectedCountry) {
            country = countries.find(currentCountry => currentCountry.code === iso && currentCountry.id === _selectedCountry) || {};
          } else {
            country = countries.find(currentCountry => currentCountry.code === iso) || {};
          }

          return {
            ...geography,
            properties: {
              ...geography.properties,
              id: index,
              isClickable: !(Object.keys(country).length === 0 && country.constructor === Object),
              isSelected: false,
              isHighlighted: false,
              countryId: country.id,
              isHome: !(Object.keys(country).length === 0 && country.constructor === Object),
              isProducing: false
            }
          };
      });
    }
    return paths.filter(p => !EXCLUDED_COUNTRIES.includes(p.properties.ISO_A3))
      .map((geography, index) => {
        const filteredCompanies = _companies.filter(company => company['producing-countries'] !== {});
        const countries = filteredCompanies.map(company => company['producing-countries']);
        const finalCountries = [];
        countries.map(country => country.map((producingCountry) => {
          finalCountries.push(producingCountry);
        }));
        const uniqCountries = uniqBy(finalCountries, 'id');
        const iso = geography.properties.ISO_A3;
        let country = {};
        if (_selectedCountry) {
          country = uniqCountries.find(uniqCountry => uniqCountry.code === iso && uniqCountry.id === _selectedCountry) || {};
        } else {
          country = uniqCountries.find(uniqCountry => uniqCountry.code === iso) || {};
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
            isHighlighted: hihglightedCountries.includes(country.code),
            countryId: country.id,
            isHome: !(Object.keys(country).length === 0 && country.constructor === Object),
            isProducing: false
          }
        };
      });
  }
);
