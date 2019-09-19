import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

const tailingStorageFacilities = state => state.tailingStorageFacilities.list;

export const getCompanies = createSelector(
  tailingStorageFacilities,
  (_tailingStorageFacilities = []) => {
    const uniqCompanies = uniqBy(_tailingStorageFacilities.map(tailingStorageFacility => tailingStorageFacility), 'company.id');
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
