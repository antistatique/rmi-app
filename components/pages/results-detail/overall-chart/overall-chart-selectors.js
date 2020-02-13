
import { createSelector } from 'reselect';
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';

import { getIssueArea } from '../results-detail-selectors';

const selectedCompany = state => state.resultsDetailPage.selectedCompany;

export const parseScores = createSelector(
  [getIssueArea, selectedCompany],
  (_issueArea = {}, _selectedCompany) => {
    const absoluteScores = _issueArea.scores.filter(score => score.kind === 'absolute_breakdown');
    const overallScores = _issueArea.scores.filter(score => score.kind === 'overall_indicator');
    const scoresByCompanies = groupBy(absoluteScores, 'company-id');
    const bestPracticeScore = _issueArea.scores.find(score => (score.kind === 'current_best_practice' && !score.name.includes('PREVIOUS'))) || {};
    const totalScores = [];
    let averageScore = 0;

    Object.values(scoresByCompanies).forEach((company) => {
      const barScore = {};
      company.forEach((scoreCell) => {
        averageScore += scoreCell.value;
        Object.assign(barScore, {
          name: scoreCell.company.name,
          ...scoreCell.label === 'Action' && { action: scoreCell.value },
          ...scoreCell.label === 'Effectiveness' && { effectiveness: scoreCell.value },
          ...scoreCell.label === 'Commitment' && { commitment: scoreCell.value },
          companyId: scoreCell.company.id,
          selected: scoreCell.company.id === _selectedCompany
        });

        barScore.overallScore = parseFloat((barScore.action + barScore.effectiveness + barScore.commitment).toFixed(2));
      });

      totalScores.push(barScore);
    });

    averageScore /= (totalScores.length * 3);

    return ({
      id: _issueArea.id,
      name: _issueArea.name,
      slug: _issueArea.slug,
      scores: orderBy(totalScores, 'overallScore', 'desc'),
      bestPracticeScore: bestPracticeScore.value,
      averageScore
    });
  }
);

export default { parseScores };
