import { connect } from 'react-redux';

import CompaniesDetailScoresBreakdown from './companies-detail-scores-breakdown-component';
import {
  getBreakdownScores,
  parseMineSitesScores,
  parseKnownTaxJurisdictions,
  parseInvestmentDisputes
} from './companies-detail-scores-breakdown-selectors';
import { setPreviousYearVisibility } from 'modules/chart/chart-actions';

export default connect(
  state => ({
    breakdownScores: getBreakdownScores(state),
    mineSites: parseMineSitesScores(state),
    investmentDisputes: parseInvestmentDisputes(state),
    knownTaxJurisdictions: parseKnownTaxJurisdictions(state),
    company: state.companies.list,
    responsive: state.responsive,
    printable: state.app.printable
  }),
  { setPreviousYearVisibility }
)(CompaniesDetailScoresBreakdown);
