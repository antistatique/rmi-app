
import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';


const scores = state => (state.mineSites.list[0] || {}).scores;

export const getOverallScore = createSelector(
  [scores],
  (_scores = []) => (_scores.find(score => score.kind === 'overal_mine_site') || {}).value
);

export const getScores = createSelector(
  [scores],
  (_scores = []) => {
    return sortBy(_scores.filter(score => score.kind === 'indicator_mine_site'), score => score.indicator.code).map((score) => {
      const label = (score.indicator || {}).name.split(' ');
      label.shift();
      const labelFinal = label.join(' ');
      return {
        id: score.id,
        name: (score.indicator || {}).code,
        label: labelFinal,
        value: score.value
      };
    });
  }
);

export default {
  getOverallScore,
  getScores
};
