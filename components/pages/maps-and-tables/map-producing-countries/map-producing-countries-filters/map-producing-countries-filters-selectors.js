import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

const companies = state => state.companies.list;

export const getUniqCompanies = createSelector(
  [companies],
  (_companies = []) => {
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
