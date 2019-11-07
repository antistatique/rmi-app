import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

const companies = state => state.companies.list;
const currentCompany = state => state.companies.currentCompany;
const countries = state => state.countries.list;

export const getUniqCompanies = createSelector(
  [companies, currentCompany],
  (_companies = [], _currentCompany) => {
    if (_currentCompany) return [{ label: _currentCompany.name, value: _currentCompany.id }];
    const uniqCompanies = uniqBy(_companies, 'id');
    return uniqCompanies.map(company => ({ label: company.name, value: company.id }))
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
  [countries],
  (_countries = []) => _countries.map(country => ({ label: country.name, value: country.id }))
);
