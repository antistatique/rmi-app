import React from 'react';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// components
import Page from 'components/page';
import Layout from 'components/layout';
import Companies from 'components/pages/companies';

// actions
import { getCompanies } from 'modules/companies/companies-actions';
import { getCountries } from 'modules/countries/countries-actions';
import { getCountriesWithCompanies } from 'components/pages/companies/companies-filters/companies-filters-actions';
import { getCommodities } from 'modules/commodities/commodities-actions';

class CompaniesPage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    const state = context.store.getState();

    await context.store.dispatch(getCompanies({
      include: ['country', 'secondary-country', 'mine-sites', 'mine-sites.country', 'mine-sites.commodities', 'selected-mine-sites'].join(','),
      sort: 'name'
    }));

    await context.store.dispatch(getCommodities({
      'fields[commodities]': ['name'].join(','),
      'filter[used]': true,
      sort: 'name'
    }));

    // populates country filter
    await context.store.dispatch(getCountriesWithCompanies({
      'fields[countries]': ['name', 'code'].join(','),
      'page[size]': 1000,
      'filter[hasCompanies]': true
    }));


    if (context.isServer || (!context.isServer && !state.countries.list.length)) {
      await context.store.dispatch(getCountries({
        include: ['producing-companies', 'companies', 'secondary-companies'].join(','),
        sort: 'name',
        'fields[countries]': ['name', 'code', 'producing-companies', 'companies', 'secondary-companies'].join(','),
        'page[size]': 1000
      }));
    }

    return { ...props };
  }

  render() {
    return (
      <Layout
        title="Companies Listing"
        description="Welcome to RMI | Companies Listing"
      >
        <Companies />
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  () => ({}),
  {}
)(CompaniesPage);
