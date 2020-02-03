import React from 'react';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// components
import Page from 'components/page';
import Layout from 'components/layout';
import IndexPageComponent from 'components/pages/index-homepage';

import { getCompanies } from 'modules/companies/companies-actions';
import { getScores } from 'components/pages/results-overall/results-overall-actions';
import { getIndicators } from 'modules/indicators/indicators-actions';

class IndexPage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    // scores for stacked-bar charts
    await context.store.dispatch(getScores({
      key: 'breakdownScores',
      queryParams: {
        include: ['company'].join(','),
        'filter[kind]': 'absolute_breakdown',
        'page[size]': 1000
      }
    }));

    await context.store.dispatch(getScores({
      key: 'bestPracticesScores',
      queryParams: {
        include: ['indicator'].join(','),
        'filter[kind]': 'current_best_practice',
        'page[size]': 1000
      }
    }));

    // scores for top companies
    await context.store.dispatch(getScores({
      key: 'overallScores',
      queryParams: {
        include: ['company'].join(','),
        'filter[kind]': 'overall_indicator',
        'page[size]': 1000
      }
    }));

    await context.store.dispatch(getScores({
      include: ['company'].join(','),
      'filter[kind]': 'overall_indicator',
      'page[size]': 1000
    }));

    await context.store.dispatch(getIndicators({ 'page[size]': 500 }));

    await context.store.dispatch(getCompanies({
      include: ['country', 'secondary-country', 'mine-sites', 'mine-sites.country', 'mine-sites.commodities', 'selected-mine-sites', 'producing-countries'].join(','),
      sort: 'name'
    }));

    return { ...props };
  }

  render() {
    return (
      <Layout
        title="Index"
        description="Welcome to RMI | Index"
      >
        <IndexPageComponent />
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  () => ({}),
  {}
)(IndexPage);
