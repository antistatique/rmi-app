import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import { paths } from 'components/common/map/map-helpers';

import { EXCLUDED_COUNTRIES } from 'constants/map';

const taxJurisdictions = state => state.companies.taxJurisdictions;
const companies = state => state.companies.list;
const selectedCompany = state => state.mapsAndTables.knownTaxFilters.company;
const selectedCountry = state => state.mapsAndTables.knownTaxFilters.country;
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
  [companies, taxJurisdictions],
  (_companies = [], _taxJurisdictions = []) => {
    const uniqTaxes = uniqBy(_taxJurisdictions, 'company.id');
    const possibleCompanies = uniqTaxes.map(tax => tax.company.id);
    return _companies.filter(company => possibleCompanies.includes(company.id));
  }
);

export const getCountries = createSelector(
  [countries, taxJurisdictions],
  (_countries = [], _taxJurisdictions = []) => {
    const selectedTaxJurisdictions = uniqBy(_taxJurisdictions, 'country.id');
    const selectedCountries = selectedTaxJurisdictions.map(tax => tax.country.id);
    return _countries.filter(country => selectedCountries.includes(country.id));
  }
);

export const getPaths = createSelector(
  [taxJurisdictions, getSelectedCompany, getSelectedCountry],
  (_taxJurisdictions = [], _company, _country) =>
    paths.filter(p => !EXCLUDED_COUNTRIES.includes(p.properties.ISO_A3))
      .map((geography, index) => {
        const iso = geography.properties.ISO_A3;
        let isHighlighted = undefined;

        if (_company) {
          const foundCompany = _taxJurisdictions.filter(tax => tax.company.id === _company.id);

          if (foundCompany) {
            isHighlighted = foundCompany.find(tax => tax.country.code === iso);
          }
        }
        const selectedTaxJurisdictions = uniqBy(_taxJurisdictions, 'country.id');
        const country = selectedTaxJurisdictions.find(taxJurisdiction => taxJurisdiction.country.code === iso);

        if (!isHighlighted && _country !== undefined) {
          isHighlighted = _country.code === iso;
        }

        return {
          ...geography,
          properties: {
            ...geography.properties,
            id: index,
            isClickable: country !== undefined,
            isSelected: false,
            isHighlighted: isHighlighted !== undefined && isHighlighted !== false,
            countryId: country !== undefined ? country.country.id : undefined,
            isHome: country !== undefined,
            isProducing: false
          }
        };
      })
);

export default { getPaths };
