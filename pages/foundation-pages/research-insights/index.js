import React from 'react';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';


// components
import Page from 'components/page';
import Layout from 'components/layout';
import ResearchInsightsListPage from 'components/pages/foundation/research-insights/index';


// actions
import { getResearchInsights } from 'modules/static-content/static-content-actions';

class ResearchInsightsPage extends Page {

  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    await context.store.dispatch(getResearchInsights({}));
    return { ...props };
  }


  render() {

    console.log('fef',this.props.url.query);
    const researchInsightId = this.props.url.query.id;

    return (
      <Layout
        title="Research Insights | The Foundation"
        description="Welcome to RMI | Research Insights"
      >

        <ResearchInsightsListPage researchInsightId={researchInsightId}/>

      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  () => ({}),
  {}
)(ResearchInsightsPage);
