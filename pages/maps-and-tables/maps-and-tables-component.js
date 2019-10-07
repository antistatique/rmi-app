import React from 'react';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

import Page from 'components/page';
import Layout from 'components/layout';

import { getTaxJurisdictions, getCompanies } from 'modules/companies/companies-actions';
import { getStockExchanges } from 'modules/stock-exchanges/stock-exchanges-actions';
import { getTailingStorageFacilities } from 'modules/tailing-storage-facilities/tailing-storage-facilities-actions';
import { getFatalityReports } from 'modules/fatality-reports/fatality-reports-actions';
import { getMineSitesPagination } from 'modules/mine-sites/mine-sites-actions';
import { getCountries } from 'modules/countries/countries-actions';
import MapsAndTables from 'components/pages/maps-and-tables';


class MapsAndTablesPage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    await context.store.dispatch(getTaxJurisdictions({ queryParams: { include: ['country', 'company', 'company.secondary-country'].join(',') } }));
    await context.store.dispatch(getStockExchanges({ queryParams: { include: ['country', 'companies'].join(',') } }));
    await context.store.dispatch(getTailingStorageFacilities({ queryParams: { include: ['country', 'company'].join(','), 'page[size]': 1000 } }));
    await context.store.dispatch(getFatalityReports({ queryParams: { include: 'company' } }));
    await context.store.dispatch(getCompanies({ include: ['country', 'secondary-country', 'mine-sites', 'mine-sites.country', 'mine-sites.commodities', 'selected-mine-sites', 'producing-countries'].join(',') }));
    await context.store.dispatch(getMineSitesPagination({ queryParams: { include: ['country', 'companies'].join(',') } }));
    await context.store.dispatch(getCountries({ sort: 'name', 'page[size]': 500 }));
    
    return { ...props };
  }

  render() {
    return (
      <Layout
        title="Maps and Tables"
        description="Welcome to RMI | Maps and Tables"
      >
        <MapsAndTables />
      </Layout>
    );
  }
}

export default withRedux(
  initStore,
  state => ({}),
  null
)(MapsAndTablesPage);
