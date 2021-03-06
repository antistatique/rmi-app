import React from 'react';
import PropTypes from 'prop-types';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// components
import Page from 'components/page';
import Layout from 'components/layout';
import CompaniesDetail from 'components/pages/companies-detail';

import { getCompany, getCompaniesScores } from 'modules/companies/companies-actions';
import { getIndicators } from 'modules/indicators/indicators-actions';
import { getSubsidiaries } from 'modules/subsidiaries/subsidiaries-actions';
import { getShareholders } from 'modules/shareholders/shareholders-actions';
import { getBeneficialOwners } from 'modules/beneficial-owners/beneficial-owners-actions';
import { getScores } from 'modules/scores/scores-actions';
import { getCountries } from 'modules/countries/countries-actions';
import { getIssueAreas } from 'components/pages/results-detail/results-detail-actions';

class CompanyPage extends Page {
  static propTypes = { company: PropTypes.object }

  static defaultProps = { company: null }

  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    await context.store.dispatch(getCompany({
      companyId: context.query.company,
      queryParams: {
        include: ['country', 'secondary-country', 'producing-countries', 'mine-sites', 'mine-sites.country',
          'mine-sites.commodities', 'mine-sites.scores', 'mine-sites.company-mine-sites', 'scores', 'shareholders', 'subsidiaries',
          'beneficial-owners', 'company-country-tax-jurisdictions', 'company-country-tax-jurisdictions.country',
          'investment-disputes', 'fatality-reports', 'selected-mine-sites', 'extra-languages', 'tailing-storage-facilities',
          'tailing-storage-facilities.country', 'government-ownership-country'
        ].join(','),
        'page[size]': 9999
      }
    }));

    // get all companies scores
    await context.store.dispatch(getCompaniesScores({
      'filter[kind]': ['overall_measurement_commitment', 'overall_measurement_action', 'overall_measurement_effectiveness'].join(','),
      'page[size]': 1000
    }));

    // gets indicators
    await context.store.dispatch(getIndicators({
      include: ['leading-practices', 'leading-practices.companies', 'companies-max-scores', 'measurement-area'].join(','),
      'page[size]': 1000
    }));

    await context.store.dispatch(getIssueAreas({
      'filter[kind]': 'issue_areas',
      include: ['children', 'scores', 'scores.company', 'children.children', 'children.children.scores', 'children.children.leading-practices', 'children.children.companies-max-scores', 'children.children.leading-practices.companies', 'children.children.measurement-area'].join(','),
      'page[size]': 1000
    }));

    // gets subsidiaries
    await context.store.dispatch(getSubsidiaries({
      'filter[company]': context.query.company,
      sort: 'name',
      include: 'country'
    }));

    // gets shareholders
    await context.store.dispatch(getShareholders({
      'filter[company]': context.query.company,
      sort: '-percent_shares'
    }));

    // get beneficial owners
    await context.store.dispatch(getBeneficialOwners({
      'filter[company]': context.query.company,
      sort: '-percent_ownership_number'
    }));

    // get all scores
    await context.store.dispatch(getScores({ 'page[size]': 1000 }));

    await context.store.dispatch(getCountries({
      include: ['producing-companies', 'companies', 'secondary-companies'].join(','),
      sort: 'name',
      'fields[countries]': ['name', 'code', 'producing-companies', 'companies', 'secondary-companies'].join(','),
      'page[size]': 1000
    }));

    return { ...props };
  }

  render() {
    const { company } = this.props;
    return (
      <Layout
        title={`Company report - ${company ? company.name : ''}`}
        description={`Welcome to RMI | Company report - ${company ? company.name : ''}`}
      >
        {company && <CompaniesDetail /> }
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  state => ({ company: state.companies.currentCompany }),
  null
)(CompanyPage);
