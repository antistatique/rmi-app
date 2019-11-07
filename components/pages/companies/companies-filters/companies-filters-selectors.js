
import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

const commodities = state => state.commodities.list;
const companies = state => state.companies.list;
const countries = state => state.countries.list;

export const parseCountries = createSelector(
  [companies, countries],
  (_companies = [], _countries = []) => {
    if (_companies.length === 0) {
      return _countries.map(country => ({ label: country.name, value: country.id }));
    }
    const tempCountries = [];
    _companies.map((company) => {
      company['producing-countries'].map((producingCountry) => {
        tempCountries.push(producingCountry);
      });
    });
    const uniqCountries = uniqBy(tempCountries, 'id');
    return uniqCountries.map(country => ({ label: country.name, value: country.id }))
      .sort((current, next) => {
        const nameCurrent = current.label.toLowerCase();
        const nameNext = next.label.toLowerCase();
        if (nameCurrent < nameNext) return -1;
        if (nameCurrent > nameNext) return 1;
        return 0;
      });
  }
);

export const parseCommodities = createSelector(
  [commodities],
  (_commodities = []) =>
    _commodities.map(commodity => ({ label: commodity.name, value: commodity.id }))
);


export default {
  parseCountries,
  parseCommodities
};
