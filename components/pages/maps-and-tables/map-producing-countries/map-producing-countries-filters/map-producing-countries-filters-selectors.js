import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

const countries = state => state.countries.list;
const companies = state => state.companies.list;

export const getCountries = createSelector(
  [countries, companies],
  (_countries = [], _companies = []) => {
    const filteredCompanies = _companies.filter(company => company['producing-countries'].length > 0);
    const tempProducingCountries = filteredCompanies.map(company => company['producing-countries']);
    const tempCountries = uniqBy(tempProducingCountries, 'id')[0];
    const producingCountries = tempCountries.map(country => country.id);
    const filteredCountries = _countries.filter(country => producingCountries.includes(country.id));
    return filteredCountries.map(country => ({ label: country.name, value: country.id }));
  }
);
