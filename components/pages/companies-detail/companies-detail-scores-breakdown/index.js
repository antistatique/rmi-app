import { connect } from 'react-redux';

import CompaniesDetailScoresBreakdown from './companies-detail-scores-breakdown-component';
import {
  getBreakdownScores,
  parseMineSitesScores,
  parseKnownTaxJurisdictions,
  parseInvestmentDisputes,
  getPreviousBreakdownScores,
  getAverageMineSites
} from './companies-detail-scores-breakdown-selectors';
import { setPreviousYearVisibility } from 'modules/chart/chart-actions';

export default connect(
  state => ({
    breakdownScores: getBreakdownScores(state),
    previousBreakdownScores: getPreviousBreakdownScores(state),
    mineSites: parseMineSitesScores(state),
    investmentDisputes: parseInvestmentDisputes(state),
    knownTaxJurisdictions: parseKnownTaxJurisdictions(state),
    company: state.companies.currentCompany,
    responsive: state.responsive,
    printable: state.app.printable,
    averageMineSite: getAverageMineSites(state)
  }),
  { setPreviousYearVisibility }
)(CompaniesDetailScoresBreakdown);
