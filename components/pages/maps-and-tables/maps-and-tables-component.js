import React, { PureComponent } from 'react';

import MapsAndTablesAccordion from './accordion';

import MapTaxJurisdictions from './map-known-tax-jurisdictions';
import MapStockExchanges from './map-stock-exchanges';
import MapTailingStorageFacilities from './map-tailing-storage-facilities';
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
              <MapsAndTablesAccordion allowMultipleOpen>
                <div label="Producing Countries">
                  <MapProducingCountries />
                </div>
                <div label="Tax Jurisdictions (known)">
                  <MapTaxJurisdictions />
                </div>
                <div label="Stock Exchanges">
                  <MapStockExchanges />
                </div>
                <div label="Tailings Storage Facilities">
                  <MapTailingStorageFacilities />
                </div>
                <div label="Fatality Reports">
                  <p>Download link goes here</p>
                </div>
                <div label="Mine Sites">
                  <p>Download link goes here</p>
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
