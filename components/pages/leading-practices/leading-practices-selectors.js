
import { createSelector } from 'reselect';

const topics = state => state.leadingPracticesPage.topics.list;
const companies = state => state.leadingPracticesPage.companies.list;
const indicators = state => state.leadingPracticesPage.indicators.list;

export const parseTopics = createSelector(
  [topics],
  (_topics = []) => _topics.map(topic => ({ label: topic.name, value: topic.id }))
);

export const parseCompanies = createSelector(
  [companies],
  (_companies = []) => _companies.map(company => ({ label: company.name, value: company.id }))
);

export const parseIndicators = createSelector(
  [indicators],
  (_indicators = []) => _indicators.map(indicator => ({ label: indicator.name, value: indicator.id }))
);

export default { parseTopics, parseCompanies, parseIndicators };
