import React from 'react';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// components
import Page from 'components/page';
import Layout from 'components/layout';
import ResultsDetail from 'components/pages/results-detail';

// actions
import { getIssueAreas } from 'components/pages/results-detail/results-detail-actions';

class ResultsDetailPage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    await context.store.dispatch(getIssueAreas({
      'filter[kind]': 'issue_areas',
      include: ['children', 'scores', 'scores.company', 'children.children', 'children.children.scores', 'children.children.leading-practices', 'children.children.companies-max-scores', 'children.children.leading-practices.companies', 'children.children.measurement-area'].join(','),
      'page[size]': 1000
    }));

    return { ...props };
  }

  render() {
    return (
      <Layout
        title="Thematic Results"
        description="Discover the Thematic Results"
      >
        <ResultsDetail />
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  () => ({}),
  {}
)(ResultsDetailPage);
