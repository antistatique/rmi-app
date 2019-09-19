import React from 'react';

// redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

import Page from 'components/page';
import Layout from 'components/layout';

import { getTaxJurisdictions } from 'modules/companies/companies-actions';
import { getStockExchanges } from 'modules/stock-exchanges/stock-exchanges-actions';
import { getTailingStorageFacilities } from 'modules/tailing-storage-facilities/tailing-storage-facilities-actions';
import MapsAndTables from 'components/pages/maps-and-tables';


class MapsAndTablesPage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);

    await context.store.dispatch(getTaxJurisdictions({ queryParams: { include: ['country', 'company'].join(',') } }));
    await context.store.dispatch(getStockExchanges({ queryParams: { include: ['country', 'companies'].join(',') } }));
    await context.store.dispatch(getTailingStorageFacilities({ queryParams: { include: ['country', 'company'].join(','), 'page[size]': 1000 } }));

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
