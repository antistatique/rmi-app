
import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';

const indicators = state => state.indicators.list;
const scores = state => (state.mineSites.list[0] || {}).scores;

export const getMineSiteIndicatorsTree = createSelector(
  [indicators, scores],
  (_indicators, _scores) => {
    const msScores = _scores.filter(score => score.name.includes('MS.'));
    const groupByName = groupBy(msScores, 'name');

    return Object.keys(groupByName).map((scoreGroup) => {
      const scoreArray = groupByName[scoreGroup];
      const uniqScoreArray = uniqBy(scoreArray, 'indicator-id');

      return {
        name: scoreGroup,
        children: uniqScoreArray.map((score) => {
          const indicator = _indicators.find(ind => parseInt(ind.id, 10) === score['indicator-id']);

          return {
            id: score.id,
            name: indicator.name,
            slug: indicator.slug,
            min: indicator.min,
            max: indicator.max,
            avg: indicator.avg,
            value: score.value,
            companiesMaxScores: indicator['companies-max-scores']
          };
        })
      };
    });
  }
);

export default { getMineSiteIndicatorsTree };
