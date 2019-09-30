import React from 'react';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

import Page from 'components/page';
import Layout from 'components/layout';
import AdverseImpacts from 'components/pages/adverse-impacts';

import { getIndicators } from 'modules/indicators/indicators-actions';
import { getCompanies } from 'modules/companies/companies-actions';
import { getMineSites } from 'modules/mine-sites/mine-sites-actions';
import { getAdverseImpacts } from 'modules/adverse-impacts/adverse-impacts-actions';
import { getCategories } from 'modules/categories/categories-actions';

class AdverseImpactsPage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    await context.store.dispatch(getCompanies({ sort: 'name' }));
    await context.store.dispatch(getMineSites({ sort: 'name' }));
    await context.store.dispatch(getCategories({ sort: 'name' }));
    await context.store.dispatch(getIndicators({
      'filter[kind]': ['issue_areas'],
      sort: 'name'
    }));
    await context.store.dispatch(getAdverseImpacts({
      include: [
        'companies', 'mine-sites', 'thematic-areas', 'adverse-impact-files', 'countries',
        'categories'
      ].join(','),
      sort: 'summarized_headline'
    }));

    return { ...props };
  }

  render() {
    return (
      <Layout
        title="Adverse Impacts"
        description="Welcome to RMI | Adverse Impacts"
      >
        <AdverseImpacts />
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  state => ({}),
  null
)(AdverseImpactsPage);
