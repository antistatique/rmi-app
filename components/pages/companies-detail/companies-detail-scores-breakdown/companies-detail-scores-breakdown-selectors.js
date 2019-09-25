
import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import { valueParser, fixedValue } from 'utils/value-parser'

const companyScores = state => (state.companies.list[0] || {}).scores;
const scores = state => state.scores.list;
const selectedMineSites = state => (state.companies.list[0] || {})['selected-mine-sites'];
const currentLanguage = state => state.language.current;
const investmentDisputes = state => (state.companies.list[0] || {})['investment-disputes'];
const knownTaxJurisdictions = state =>
  (state.companies.list[0] || {})['company-country-tax-jurisdictions'];

export const parseInvestmentDisputes = createSelector(
  [investmentDisputes],
  (_investmentDisputes = []) => orderBy(_investmentDisputes, 'name', ['asc'])
)

export const parseMineSitesScores = createSelector(
  [selectedMineSites, currentLanguage],
  (_selectedMineSites = [], _currentLanguage) =>
    orderBy(_selectedMineSites.map(mineSite => ({
      id: mineSite.id,
      name: mineSite.name,
      scores: {
        localProcurment: ((mineSite.scores || []).find(score => score.slug.includes('ms-02')) || {}).value,
        localEmployment: ((mineSite.scores || []).find(score => score.slug.includes('ms-01')) || {}).value,
        communityGrievance: ((mineSite.scores || []).find(score => score.slug.includes('ms-04')) || {}).value,
        workersGrievance: ((mineSite.scores || []).find(score => score.slug.includes('ms-05')) || {}).value,
        waterQuality: ((mineSite.scores || []).find(score => score.slug.includes('ms-07')) || {}).value,
        postClosurePlans: ((mineSite.scores || []).find(score => score.slug.includes('ms-03')) || {}).value,
        airQuality: ((mineSite.scores || []).find(score => score.slug.includes('ms-06')) || {}).value,
        waterQuantity: ((mineSite.scores || []).find(score => score.slug.includes('ms-08')) || {}).value,
        tailingsManagement: ((mineSite.scores || []).find(score => score.slug.includes('ms-09')) || {}).value,
        emergencyPreparedness: ((mineSite.scores || []).find(score => score.slug.includes('ms-10')) || {}).value
      },
      overall: fixedValue(valueParser(((mineSite.scores || []).find(score => score.kind === 'overal_mine_site') || {}).value)),
      language: _currentLanguage
    })), 'name', ['asc'])
);


export const getBreakdownScores = createSelector(
  [companyScores, scores],
  (_companyScores = [], _scores = []) => {
    const breakdownScores = _companyScores.filter(score => ((score || {}).kind === 'absolute_breakdown') && !score.name.includes('PREVIOUS'));
    const groupedByParent = groupBy(breakdownScores, 'parent-id');
    const scoreOrder = ['Commitment', 'Action', 'Effectiveness'];

    return Object.keys(groupedByParent).map((parentId) => {
      const scoreGroup = groupedByParent[parentId];
      const parentScore = _companyScores.find(score => score.id === parentId) || {};
      const collectiveBestScore = _scores.find(score => (score.kind === 'current_best_practice' && score['indicator-id'] === parentScore['indicator-id'] && !score.name.includes('PREVIOUS')));

      return ({
        id: parentScore.id,
        name: parentScore.label,
        indicatorId: parentScore['indicator-id'],
        slug: parentScore.slug,
        value: parentScore.value,
        collectiveBestScore,
        children: scoreGroup.map(scoreChild => ({
          id: scoreChild.id,
          name: scoreChild.label,
          value: scoreChild.value
        }))
          .sort((a, b) => ((scoreOrder.indexOf(a.name) < scoreOrder.indexOf(b.name)) ? -1 : 1))
      });
    });
  }
);

export const getPreviousBreakdownScores = createSelector(
  [companyScores, scores],
  (_companyScores = [], _scores = []) => {
    const breakdownScores = _companyScores.filter(score => ((score || {}).kind === 'absolute_breakdown') && score.name.includes('PREVIOUS'));
    const groupedByParent = groupBy(breakdownScores, 'parent-id');
    const scoreOrder = ['Commitment', 'Action', 'Effectiveness'];

    return Object.keys(groupedByParent).map((parentId) => {
      const scoreGroup = groupedByParent[parentId];
      const parentScore = _companyScores.find(score => score.id === parentId) || {};
      const collectiveBestScore = _scores.find(score => (score.kind === 'current_best_practice' && score['indicator-id'] === parentScore['indicator-id'] && score.name.includes('PREVIOUS')));

      return ({
        id: parentScore.id,
        name: parentScore.label,
        indicatorId: parentScore['indicator-id'],
        slug: parentScore.slug,
        value: parentScore.value,
        collectiveBestScore,
        children: scoreGroup.map(scoreChild => ({
          id: scoreChild.id,
          name: scoreChild.label,
          value: scoreChild.value
        }))
          .sort((a, b) => ((scoreOrder.indexOf(a.name) < scoreOrder.indexOf(b.name)) ? -1 : 1))
      });
    });
  }
)

export const parseKnownTaxJurisdictions = createSelector(
  [knownTaxJurisdictions],
  (_knownTaxJurisdictions = []) => {
    const sorted = orderBy(_knownTaxJurisdictions, 'country.name', ['asc']);

    const rows = [];
    sorted.forEach((item, index) => {
      rows.push({
        id: index,
        country: sorted[index].country.name,
      });
    });

    return rows;
  }
);

export default {
  getBreakdownScores,
  parseMineSitesScores,
  parseKnownTaxJurisdictions
};
