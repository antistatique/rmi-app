import React, { PureComponent } from 'react';

import MapsAndTablesAccordion from './accordion';

import MapTaxJurisdictions from './map-known-tax-jurisdictions';
import MapStockExchanges from './map-stock-exchanges';
import MapTailingStorageFacilities from './map-tailing-storage-facilities';
import TableFatalityReports from './table-fatality-reports';
import MapProducingCountries from './map-producing-countries';
import TableMineSites from './table-mine-sites';
import MapMineSites from './map-mine-sites';

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
              <MapsAndTablesAccordion allowMultipleOpen>
                <div label="Producing Countries">
                  <MapProducingCountries />
                </div>
                <div label="Known Tax Jurisdictions">
                  <MapTaxJurisdictions />
                </div>
                <div label="Stock Exchanges">
                  <MapStockExchanges />
                </div>
                <div label="Tailings Storage Facilities">
                  <MapTailingStorageFacilities />
                </div>
                <div label="Fatality Reports">
                  <TableFatalityReports />
                </div>
                <div label="Mine Sites">
                  <MapMineSites />
                  <TableMineSites />
                </div>
              </MapsAndTablesAccordion>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MapsAndTables;
