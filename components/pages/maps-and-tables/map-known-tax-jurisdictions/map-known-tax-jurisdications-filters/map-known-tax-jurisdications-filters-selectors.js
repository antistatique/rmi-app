import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

const countries = state => state.countries.list;
const taxJurisdictions = state => state.companies.taxJurisdictions;

export const getCountries = createSelector(
  [countries, taxJurisdictions],
  (_countries = [], _taxJurisdictions = []) => {
    const selectedTaxJurisdictions = uniqBy(_taxJurisdictions, 'country.id');
    const selectedCountries = selectedTaxJurisdictions.map(tax => tax.country.id);
    const tempCountries = _countries.filter(country => selectedCountries.includes(country.id));
    return tempCountries.map(country => ({ label: country.name, value: country.id }));
  }
);
