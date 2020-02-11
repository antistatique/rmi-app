import React from 'react';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// components
import Page from 'components/page';
import Layout from 'components/layout';
import ResultsOverall from 'components/pages/results-overall';

// actions
import { getScores } from 'components/pages/results-overall/results-overall-actions';
import { getIndicators } from 'modules/indicators/indicators-actions';

class ResultsOverallPage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    // scores for stacked-bar charts
    await context.store.dispatch(getScores({
      key: 'breakdownScores',
      queryParams: {
        include: ['company'].join(','),
        'filter[kind]': 'absolute_breakdown',
        'page[size]': 2000
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

    return { ...props };
  }

  render() {
    return (
      <Layout
        title="Results | Overall"
        description="Welcome to RMI | Results - Overall"
      >
        <ResultsOverall />
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  () => ({}),
  {}
)(ResultsOverallPage);
