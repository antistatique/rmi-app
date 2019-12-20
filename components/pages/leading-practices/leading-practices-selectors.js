
import { createSelector } from 'reselect';

const companies = state => state.companies.list;
const indicators = state => state.indicators.list;
const topics = state => state.topics.list;
const leadingPractices = state => state.leadingPracticesPage.leadingPractices.list;

export const parseIndicators = createSelector(
  [indicators],
  (_indicators = []) => _indicators.map(indicator => ({ label: indicator.name, value: indicator.id }))
);

export const parseCompanies = createSelector(
  [companies],
  (_companies = []) => _companies.map(company => ({ label: company.name, value: company.id }))
);

export const parseTopics = createSelector(
  [topics, leadingPractices],
  (_topics = [], _leadingPractices = []) =>  {
    let topicIds = [];
    _leadingPractices.forEach((leading) => {
      leading.topics.map((topic) => {
        topicIds = [
          ...topicIds,
          topic.id
        ];
      });
    });
    const finalTopics = _topics.filter(topic => topicIds.includes(topic.id));
    return finalTopics.map(topic => ({ label: topic.name, value: topic.id }));
  }
);

export default { parseCompanies, parseIndicators, parseTopics };
