
import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';

const indicators = state => state.indicators.list;
const scores = state => (state.mineSites.list[0] || {}).scores;

export const getMineSiteIndicatorsTree = createSelector(
  [indicators, scores],
  (_indicators, _scores) => {
    const msScores = uniqBy(_scores.filter(score => score.name.includes('MS.')), 'indicator-id');
    const sortedMsScores = msScores.sort((score1, score2) => {
      const number1 = score1.name.split(' ').join('').split('.')[1];
      const number2 = score2.name.split(' ').join('').split('.')[1];
      if (number1 > number2) {
        return 1;
      } else if (number1 < number2) {
        return -1;
      }
    });
    const groupByName = groupBy(sortedMsScores, 'name');

    return Object.keys(groupByName).map((scoreGroup) => {
      const scoreArray = groupByName[scoreGroup];

      return {
        name: scoreGroup,
        children: scoreArray.map((score) => {
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
