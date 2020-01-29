
import { createSelector } from 'reselect';

// constants
import { SCORE_COMPARISON_CONFIG } from 'components/common/score-comparison/score-comparison-constants';

const indicators = state => state.indicators.list;
const currentIssueArea = state => state.companiesDetailPage.issueArea;
const scores = state => (state.companies.currentCompany || {}).scores;
const company = state => state.companies.currentCompany;

export const getIssueAreaTree = createSelector(
  [indicators, currentIssueArea, scores, company],
  (_indicators, _currentIssueArea, _scores, _company) => {
    // A. Lorem ipsum...
    const category = _indicators.find(indicator => indicator.id === _currentIssueArea) || {};

    // A.01 Lorem ipsum...
    const subCategories = _indicators.filter(indicator => indicator['parent-id'] === +category.id);

    return {
      name: category.label,
      data: subCategories.map(subCategory => ({
        id: subCategory.id,
        name: subCategory.name,
        // A.01.1 Lorem ipsum...
        children: _indicators.filter(indicator =>
          indicator['parent-id'] === +subCategory.id)
          .map(ind => ({
            id: ind.id,
            name: ind.name,
            slug: ind.slug,
            min: ind.min,
            max: ind.max,
            avg: ind.avg,
            measurementArea: ind['measurement-area']['measurement-area'],
            value: (_scores.find(score => score['indicator-id'] === +ind.id) || {}).value,
            color: SCORE_COMPARISON_CONFIG[category.slug],
            leadingPractices: ind['leading-practices'].filter((leadingPractice) => {
              const companyFound = leadingPractice.companies.filter(leadingCompany => leadingCompany.id === _company.id);
              if (companyFound.length !== 0) {
                return leadingPractice;
              }
            }),
            companiesMaxScores: ind['companies-max-scores']
          }))
      }))
    };
  }
);

export default { getIssueAreaTree };
