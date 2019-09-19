import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

const taxJurisdictions = state => state.companies.taxJurisdictions;

export const getCompanies = createSelector(
  taxJurisdictions,
  (_taxJurisdictions = []) => {
    const uniqCompanies = uniqBy(_taxJurisdictions.map(taxJurisdiction => taxJurisdiction), 'company.id');
    const companies = uniqCompanies.map(uniqCompany => uniqCompany.company);

    return companies.map(company => ({ label: company.name, value: company.id }));
  }
);
