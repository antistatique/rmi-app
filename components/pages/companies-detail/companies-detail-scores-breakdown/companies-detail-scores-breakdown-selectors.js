
import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import { valueParser, fixedValue } from 'utils/value-parser'

const scores = state => (state.companies.list[0] || {}).scores;
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
      localProcurment: ((mineSite.scores || []).find(score => score.slug.includes('ms-01-1')) || {}).value,
      localEmployment: ((mineSite.scores || []).find(score => score.slug.includes('ms-02-1')) || {}).value,
      communityGrievance: ((mineSite.scores || []).find(score => score.slug.includes('ms-03-1')) || {}).value,
      workersGrievance: ((mineSite.scores || []).find(score => score.slug.includes('ms-04-1')) || {}).value,
      waterQuality: ((mineSite.scores || []).find(score => score.slug.includes('ms-05-1')) || {}).value,
      biodiversity: ((mineSite.scores || []).find(score => score.slug.includes('ms-06-1')) || {}).value,
      overall: fixedValue(valueParser(((mineSite.scores || []).find(score => score.kind === 'overal_mine_site') || {}).value)),
      language: _currentLanguage
    })), 'name', ['asc'])
);


export const getBreakdownScores = createSelector(
  [scores],
  (_scores = []) => {
    const breakdownScores = _scores.filter(score => (score || {}).kind === 'breakdown');
    const groupedByParent = groupBy(breakdownScores, 'parent-id');
    const scoreOrder = ['Commitment', 'Action', 'Effectiveness'];

    return Object.keys(groupedByParent).map((parentId) => {
      const scoreGroup = groupedByParent[parentId];
      const parentScore = _scores.find(score => score.id === parentId) || {};

      return ({
        id: parentScore.id,
        name: parentScore.label,
        indicatorId: parentScore['indicator-id'],
        slug: parentScore.slug,
        value: parentScore.value,
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

export const parseKnownTaxJurisdictions = createSelector(
  [knownTaxJurisdictions],
  (_knownTaxJurisdictions = []) => {
    const sorted = orderBy(_knownTaxJurisdictions, 'country.name', ['asc']);

    const rows = [];
    sorted.forEach((item, index) => {
      // Skip every two items to build new row with new items.
      if (index % 2) {
        return;
      }

      // Generate the first column of the row.
      rows.push({
        id: index,
        country_col1: sorted[index].country.name,
        country_col2: sorted[index+1] !== undefined ? sorted[index+1].country.name : '',
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
