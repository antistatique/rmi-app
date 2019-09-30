import { createSelector } from 'reselect';

const companies = state => state.companies.list;
const mineSites = state => state.mineSites.list;
const categories = state => state.categories.list;

export const parseCompanies = createSelector(
  [companies],
  (_companies = []) => _companies.map(company => ({ label: company.name, value: company.id }))
);

export const parseMineSites = createSelector(
  [mineSites],
  (_mineSites = []) => _mineSites.map(mineSite => ({ label: mineSite.name, value: mineSite.id }))
);

export const parseCategories = createSelector(
  [categories],
  (_categories = []) => _categories.map(category => ({ label: category.name, value: category.id }))
);

export default {
  parseCompanies,
  parseMineSites,
  parseCategories
};
