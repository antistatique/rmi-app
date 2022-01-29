
import { createSelector } from 'reselect';
import { paths } from 'components/common/map/map-helpers';
import flatten from 'lodash/flatten';

// constants
import { EXCLUDED_COUNTRIES } from 'constants/map';

const countries = state => state.countries.list;
const countriesWithCompanies = state => state.companiesFilters.countries;
const companies = state => state.companies.list;
const filters = state => state.companiesPage.filters;
const selectedCompany = state => state.companiesPage.selectedCompany;

export const getSelectedCompany = createSelector(
  [companies, selectedCompany],
  (_companies, _selectedCompany) => _companies.find(company => company.id === _selectedCompany)
);

export const getUpdatedPaths = createSelector(
  [countries, countriesWithCompanies, filters, getSelectedCompany],
  (_countries = [], _countriesWithCompanies, _filters = {}) =>
    paths.filter(p => !EXCLUDED_COUNTRIES.includes(p.properties.ISO_A3))
      .map((geography, index) => {
        const { country: countrySelected } = _filters;

        const iso = geography.properties.ISO_A3;
        const country = _countries.find(_country => _country.code === iso) || {};
        const isSelected = countrySelected ? country.id === countrySelected : false;
        const isHighlighted = country.id === countrySelected;
        const isHome = !!((country.companies || []).length ||
          (country.secondaryCompanies || []).length);
        const isProducing = !!((country.producingCompanies || []).length);

        return {
          ...geography,
          properties: {
            ...geography.properties,
            id: index,
            isClickable: country !== undefined,
            isSelected,
            isHighlighted,
            countryId: country.id,
            isHome,
            isProducing
          }
        };
      })
);

export const getMarkers = createSelector(
  companies,
  (_companies = []) =>
    flatten(_companies.map(company =>
      (company['selected-mine-sites'] || []).map(mineSite => ({
        id: mineSite.id,
        name: mineSite.name,
        coordinates: [mineSite['coord-y'], mineSite['coord-x']]
      }))))
);

export default {
  getUpdatedPaths,
  getMarkers
};
