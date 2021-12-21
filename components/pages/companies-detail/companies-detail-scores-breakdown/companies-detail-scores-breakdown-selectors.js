
import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';

// constants
import { MINE_SITE_INDICATORS_ID } from './companies-detail-scores-breakdown-constants';

const companyScores = state => (state.companies.currentCompany || {}).scores;
const scores = state => state.scores.list;
const issueAreas = state => state.resultsDetailPage.issueAreas;
const selectedMineSites = state => (state.companies.currentCompany || {})['selected-mine-sites'];
const currentLanguage = state => state.language.current;
const investmentDisputes = state => (state.companies.currentCompany || {})['investment-disputes'];
const knownTaxJurisdictions = state =>
  (state.companies.currentCompany || {})['company-country-tax-jurisdictions'];

export const parseInvestmentDisputes = createSelector(
  [investmentDisputes],
  (_investmentDisputes = []) => orderBy(_investmentDisputes, 'name', ['asc'])
);

export const parseMineSitesScores = createSelector(
  [selectedMineSites, currentLanguage],
  (_selectedMineSites = [], _currentLanguage) => orderBy(
    _selectedMineSites.map((mineSite) => {
      const localEmployment = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.localEmployment]);
      const localProcurement = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.localProcurement]);
      const airQuality = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.airQuality]);
      const waterQuality = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.waterQuality]);
      const waterQuantity = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.waterQuantity]);
      const rehabilitationandPostClosure = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.rehabilitationandPostClosure]);
      const tailings = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.tailings]);
      const safetyofCommunities = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.safetyofCommunities]);
      const communityComplaintsandGrievances = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.communityComplaintsandGrievances]);
      const safetyandHealthofWorkers = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.safetyandHealthofWorkers]);
      const womenWorkers = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.womenWorkers]);
      const workplaceDeathsandInjuries = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.workplaceDeathsandInjuries]);
      const trainingofWorkers = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.trainingofWorkers]);
      const decentLivingWage = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.decentLivingWage]);
      const workerComplaintsandGrievances = find(mineSite.scores, ['indicator-id', MINE_SITE_INDICATORS_ID.workerComplaintsandGrievances]);
      const overall = mineSite.scores[15];

      return {
        id: mineSite.id,
        name: mineSite.name,
        scores: {
          localEmployment: localEmployment !== undefined ? localEmployment.value : '-',
          localProcurement: localProcurement !== undefined ? localProcurement.value : '-',
          airQuality: airQuality !== undefined ? airQuality.value : '-',
          waterQuality: waterQuality !== undefined ? waterQuality.value : '-',
          waterQuantity: waterQuantity !== undefined ? waterQuantity.value : '-',
          rehabilitationandPostClosure: rehabilitationandPostClosure !== undefined ? rehabilitationandPostClosure.value : '-',
          tailings: tailings !== undefined ? tailings.value : '-',
          safetyofCommunities: safetyofCommunities !== undefined ? safetyofCommunities.value : '-',
          communityComplaintsandGrievances: communityComplaintsandGrievances !== undefined ? communityComplaintsandGrievances.value : '-',
          safetyandHealthofWorkers: safetyandHealthofWorkers !== undefined ? safetyandHealthofWorkers.value : '-',
          womenWorkers: womenWorkers !== undefined ? womenWorkers.value : '-',
          workplaceDeathsandInjuries: workplaceDeathsandInjuries !== undefined ? workplaceDeathsandInjuries.value : '-',
          trainingofWorkers: trainingofWorkers !== undefined ? trainingofWorkers.value : '-',
          decentLivingWage: decentLivingWage !== undefined ? decentLivingWage.value : '-',
          workerComplaintsandGrievances: workerComplaintsandGrievances !== undefined ? workerComplaintsandGrievances.value : '-'
        },
        overall: overall ? overall.value : '-',
        language: _currentLanguage
      };
    }),
    'name', ['asc']
  )
);


export const getBreakdownScores = createSelector(
  [companyScores, scores, issueAreas],
  (_companyScores = [], _scores = [], _issueAreas = []) => {
    const breakdownScores = _companyScores.filter(score => ((score || {}).kind === 'absolute_breakdown') && !score.name.includes('PREVIOUS'));
    const groupedByParent = groupBy(breakdownScores, 'parent-id');
    const scoreOrder = ['Commitment', 'Action', 'Effectiveness'];


    return Object.keys(groupedByParent).map((parentId) => {
      const scoreGroup = groupedByParent[parentId];
      const parentScore = _companyScores.find(score => score.id === parentId) || {};

      const issueAreasItem = _issueAreas[findIndex(_issueAreas, i => +i.id === parentScore['indicator-id'])] || { scores: [] };
      const averageScore = (issueAreasItem.scores.find(score => score.kind === 'average-line' && !score.name.includes('PREVIOUS')) || {}).value;
      const bestScore = (issueAreasItem.scores.find(score => score.kind === 'current_best_practice' && !score.name.includes('PREVIOUS')) || {}).value;

      return ({
        id: parentScore.id,
        name: parentScore.label,
        indicatorId: parentScore['indicator-id'],
        slug: parentScore.slug,
        value: parentScore.value,
        average: averageScore,
        best: bestScore,
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
        country: sorted[index].country.name
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
