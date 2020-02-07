import React from 'react';

import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// components
import Page from 'components/page';
import Layout from 'components/layout';

// components
import LeadingPracticesPageComponent from 'components/pages/leading-practices';

import { getLeadingPractices } from 'components/pages/leading-practices/leading-practices-actions';
import { getCompanies } from 'modules/companies/companies-actions';
import { getTopics } from 'modules/topics/topics-actions';

class LeadingPracticesPage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    await context.store.dispatch(getLeadingPractices({ include: ['companies', 'topics'].join(',') }));

    await context.store.dispatch(getCompanies({ sort: 'name' }));
    await context.store.dispatch(getTopics({}));

    return { ...props };
  }

  render() {
    return (
      <Layout
        title="RMI | Leading Practices"
        description="Welcome to RMI | Leading Practices"
      >
        <LeadingPracticesPageComponent />
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  () => ({}),
  { getLeadingPractices }
)(LeadingPracticesPage);
