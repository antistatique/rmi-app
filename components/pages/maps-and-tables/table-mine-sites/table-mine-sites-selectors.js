import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

const mineSites = state => state.mineSites.list;
const countries = state => state.countries.list;

export const getCompanies = createSelector(
  [mineSites],
  (_mineSites = []) => {
    const listCompanies = _mineSites.map(mineSite => mineSite.companies);
    const tempCompanies = [];
    listCompanies.map((listCompany) => {
      const companies = listCompany.map((subListCompany) => {
        tempCompanies.push(subListCompany);
        return subListCompany;
      });
      return companies;
    });
    const uniqCompanies = uniqBy(tempCompanies, 'id');

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

export const parseCountries = createSelector(
  [countries],
  (_countries = []) => _countries.map(country => ({ label: country.name, value: country.id }))
);

export const getMineSites = createSelector(
  [mineSites],
  (_mineSites = []) => {
    _mineSites.map((mineSite, index) => {
      const companiesIds = mineSite.companies.map(company => parseInt(company.id, 10));
      const companiesShare = mineSite['company-mine-sites'].filter(companyMineSite => companiesIds.includes(companyMineSite['company-id']));
      _mineSites[index].companiesShare = companiesShare;
    });

    return _mineSites;
  }
);
