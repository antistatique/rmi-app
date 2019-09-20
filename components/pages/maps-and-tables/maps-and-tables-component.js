import React, { PureComponent } from 'react';

import MapTaxJurisdictions from './map-known-tax-jurisdictions';
import MapStockExchanges from './map-stock-exchanges';
import MapTailingStorageFacilities from './map-tailing-storage-facilities';
import TableFatalityReports from './table-fatality-reports';
import MapProducingCountries from './map-producing-countries';

class MapsAndTables extends PureComponent {
  render() {
    return (
      <div className="c-map-and-tables">
        <div className="page-intro">
          <div className="l-layout">
            <div className="row">
              <div className="col-12">
                <h2 className="title">Maps and Tables</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="page-content">
          <div className="section -dark">
            <div className="l-layout">
              <MapProducingCountries />
            </div>
          </div>
          <div className="section">
            <div className="l-layout">
              <MapTaxJurisdictions />
            </div>
          </div>
          <div className="section -dark">
            <div className="l-layout">
              <MapStockExchanges />
            </div>
          </div>
          <div className="section">
            <div className="l-layout">
              <MapTailingStorageFacilities />
            </div>
          </div>
          <div className="section -dark">
            <div className="l-layout">
              <TableFatalityReports />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MapsAndTables;
