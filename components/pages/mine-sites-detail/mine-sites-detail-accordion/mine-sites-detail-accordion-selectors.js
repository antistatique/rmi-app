
import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';

const indicators = state => state.indicators.list;
const scores = state => (state.mineSites.list[0] || {}).scores;

export const getMineSiteIndicatorsTree = createSelector(
  [indicators, scores],
  (_indicators, _scores) => {
    const msIndicatores = uniqBy(_indicators.filter(indicator => indicator.name.match(/MS.[0-9]{2}/g)), 'name');
    const sortedMsIndicators = msIndicatores.sort((ind1, ind2) => {
      const number1 = ind1.name.split(' ').join('').split('.')[1];
      const number2 = ind2.name.split(' ').join('').split('.')[1];
      if (number1 > number2) {
        return 1;
      } else if (number1 < number2) {
        return -1;
      }
    });

    return sortedMsIndicators.map((indicator) => {
      const indScores = uniqBy(_scores.filter(score => score['indicator-id'] === parseInt(indicator.id, 10)), 'indicator-id');
      return {
        name: indicator.name,
        children: indScores.map((score) => {
          return {
            id: score.id,
            name: score.name,
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
