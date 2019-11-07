import React from 'react';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// actions
import { getSubsidiaries } from 'modules/subsidiaries/subsidiaries-actions';
import { getCompanies } from 'modules/companies/companies-actions';

// components
import Page from 'components/page';
import Layout from 'components/layout';
import SubsidiariesPageComponent from 'components/pages/subsidiaries';

class SubsidiariesPage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    // gets subsidiaries
    await context.store.dispatch(getSubsidiaries({
      include: ['company', 'country'].join(','),
      sort: 'name'
    }));

    await context.store.dispatch(getCompanies({ sort: 'name' }));

    return { ...props };
  }

  render() {
    if (this.props.companies.length === 0) {
      this.props.getCompanies({ sort: 'name' });
    }

    return (
      <Layout
        title="Subsidiaries"
        description="Welcome to RMI | Subsidiaries"
      >
        <SubsidiariesPageComponent />
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  state => ({ companies: state.companies.list }),
  { getCompanies }
)(SubsidiariesPage);
