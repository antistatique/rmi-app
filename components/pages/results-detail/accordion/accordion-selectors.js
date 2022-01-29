import { createSelector } from 'reselect';
import orderBy from 'lodash/orderBy';
// constants
import { SCORE_COMPARISON_CONFIG } from 'components/common/score-comparison/score-comparison-constants';

// selectors
import { getIssueArea } from '../results-detail-selectors';

const indicators = state => state.indicators.list;

export const parseIndicators = createSelector(
  [getIssueArea, indicators],
  (_issueArea, _indicators) => {
    const children = _indicators.filter(indicator => indicator['parent-id'] === _issueArea['root-id']);

    const results = orderBy(children || [], 'code')
      .map((indicator = {}) => ({
        id: indicator.id,
        name: indicator.name,
        children: orderBy(_indicators.filter(i => i['parent-id'] === +indicator.id) || [], 'code')
          .map(child => ({
            id: child.id,
            name: child.name,
            label: child.label,
            summary: (child || {}).summary,
            avg: child.avg,
            min: child.min,
            max: child.max,
            measurementArea: child['measurement-area']['measurement-area'],
            value: ((child.scores || [])[0] || {}).value,
            color: SCORE_COMPARISON_CONFIG[_issueArea.slug],
            leadingPractices: child['leading-practices'],
            companiesMaxScores: child['companies-max-scores']
          }))
      }));

    return results;
  }
);

export default { parseIndicators };
