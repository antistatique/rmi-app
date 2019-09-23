import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

const stockExchanges = state => state.stockExchanges.list;

export const getCompanies = createSelector(
  stockExchanges,
  (_stockExchanges = []) => {
    const listCompanies = _stockExchanges.map(stockExchange => stockExchange.companies);
    const tempCompanies = [];
    listCompanies.map((listCompany) => {
      const companies = listCompany.map((subListCompany) => {
        tempCompanies.push(subListCompany);
        return subListCompany;
      });
      return companies;
    });
    const companies = uniqBy(tempCompanies, 'id');

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
