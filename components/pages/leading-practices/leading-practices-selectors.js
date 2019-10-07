
import { createSelector } from 'reselect';

const companies = state => state.companies.list;
const indicators = state => state.indicators.list;

export const parseIndicators = createSelector(
  [indicators],
  (_indicators = []) => _indicators.map(indicator => ({ label: indicator.name, value: indicator.id }))
);

export const parseCompanies = createSelector(
  [companies],
  (_companies = []) => _companies.map(company => ({ label: company.name, value: company.id }))
);

export default { parseCompanies, parseIndicators };
