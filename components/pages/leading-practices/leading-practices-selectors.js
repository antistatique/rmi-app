
import { createSelector } from 'reselect';

const companies = state => state.companies.list;
const indicators = state => state.indicators.list;
const topics = state => state.topics.list;

export const parseIndicators = createSelector(
  [indicators],
  (_indicators = []) => _indicators.map(indicator => ({ label: indicator.name, value: indicator.id }))
);

export const parseCompanies = createSelector(
  [companies],
  (_companies = []) => _companies.map(company => ({ label: company.name, value: company.id }))
);

export const parseTopics = createSelector(
  [topics],
  (_topics = []) => _topics.map(topic => ({ label: topic.name, value: topic.id }))
);

export default { parseCompanies, parseIndicators, parseTopics };
