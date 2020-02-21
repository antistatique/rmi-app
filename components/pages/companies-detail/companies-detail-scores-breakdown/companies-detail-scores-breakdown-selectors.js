
import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import find from 'lodash/find';

// constants
import { MINE_SITE_INDICATORS_ID } from './companies-detail-scores-breakdown-constants';

const companyScores = state => (state.companies.currentCompany || {}).scores;
const scores = state => state.scores.list;
const selectedMineSites = state => (state.companies.currentCompany || {})['selected-mine-sites'];
const currentLanguage = state => state.language.current;
const investmentDisputes = state => (state.companies.currentCompany || {})['investment-disputes'];
const knownTaxJurisdictions = state =>
  (state.companies.currentCompany || {})['company-country-tax-jurisdictions'];

export const parseInvestmentDisputes = createSelector(
  [investmentDisputes],
  (_investmentDisputes = []) => orderBy(_investmentDisputes, 'name', ['asc'])
)

export const parseMineSitesScores = createSelector(
  [selectedMineSites, currentLanguage],
  (_selectedMineSites = [], _currentLanguage) => {
    return orderBy(
      _selectedMineSites.map((mineSite) => {

        const localProcurment = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.localProcurment]);
        const localEmployment = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.localEmployment]);
        const communityGrievance = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.communityGrievance]);
        const workersGrievance = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.workersGrievance]);
        const waterQuality = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.waterQuality]);
        const postClosurePlans = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.postClosurePlans]);
        const airQuality = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.airQuality]);
        const waterQuantity = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.waterQuantity]);
        const tailingsManagement = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.tailingsManagement]);
        const emergencyPreparedness = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.emergencyPreparedness]);
        const overall = mineSite.scores[10];

        return {
        id: mineSite.id,
        name: mineSite.name,
        scores: {
          localProcurment: localProcurment ? localProcurment.value : '-',
          localEmployment: localEmployment ? localEmployment.value : '-',
          communityGrievance: communityGrievance ? communityGrievance.value : '-',
          workersGrievance: workersGrievance ? workersGrievance.value : '-',
          waterQuality: waterQuality ? waterQuality.value : '-',
          postClosurePlans: postClosurePlans ? postClosurePlans.value : '-',
          airQuality: airQuality ? airQuality.value : '-',
          waterQuantity: waterQuantity ? waterQuantity.value : '-',
          tailingsManagement: tailingsManagement ? tailingsManagement.value : '-',
          emergencyPreparedness: emergencyPreparedness ? emergencyPreparedness.value : '-',
        },
        overall: overall ? overall.value : '-',
        language: _currentLanguage
      };
    }),
    'name', ['asc']);
  }
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
);

export const getAverageMineSites = createSelector(
  [companyScores],
  (_companyScores = []) => _companyScores.find(score => score.kind === '-').value
);

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
