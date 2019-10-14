import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

const taxJurisdictions = state => state.companies.taxJurisdictions;
const countries = state => state.countries.list;

export const parseCompanies = createSelector(
  taxJurisdictions,
  (_taxJurisdictions = []) => {
    const uniqCompanies = uniqBy(_taxJurisdictions.map(taxJurisdiction => taxJurisdiction), 'company.id');
    const companies = uniqCompanies.map(uniqCompany => uniqCompany.company);

    return companies.map(company => ({ label: company.name, value: company.id }))
      .sort((current, next) => {
        const nameCurrent = current.label.toLowerCase();
        const nameNext = next.label.toLowerCase();
        if (nameCurrent < nameNext) return -1;
        if (nameCurrent > nameNext) return 1;
        return 0;
      });
  }
);

export const getCountries = createSelector(
  countries,
  (_countries = []) => _countries.map(country => ({ label: country.name, value: country.id }))
);
