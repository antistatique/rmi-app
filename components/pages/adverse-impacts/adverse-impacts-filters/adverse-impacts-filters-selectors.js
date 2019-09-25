import { createSelector } from 'reselect';

const companies = state => state.companies.list;
const mineSites = state => state.mineSites.list;
const indicators = state => state.indicators.list;

export const parseCompanies = createSelector(
  [companies],
  (_companies = []) => _companies.map(company => ({ label: company.name, value: company.id }))
);

export const parseMineSites = createSelector(
  [mineSites],
  (_mineSites = []) => _mineSites.map(mineSite => ({ label: mineSite.name, value: mineSite.id }))
);

export const parseIndicators = createSelector(
  [indicators],
  (_indicators = []) => _indicators.map(indicator => (
    { label: indicator.name, value: indicator.id }
  ))
);

export default {
  parseCompanies,
  parseMineSites,
  parseIndicators
};
