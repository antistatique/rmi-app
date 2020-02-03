import React, { PureComponent } from 'react';

import MapsAndTablesAccordion from './accordion';

import MapTaxJurisdictions from './map-known-tax-jurisdictions';
import MapStockExchanges from './map-stock-exchanges';
import MapProducingCountries from './map-producing-countries';

import styles from './maps-and-tables-styles.scss';

class MapsAndTables extends PureComponent {
  render() {
    return (
      <div className="c-map-and-tables">
        <style jsx>{styles}</style>
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
                  <div className="row mb-4 text-white">
                    <a className="downloadable-links" href="/static/files/RMI_Report_2020_Tailing_Storage_Facilities.xlsx" download>Summary file</a>
                  </div>
                </div>
                <div label="Fatality Reports">
                  <div className="row mb-4 text-white">
                    <a className="downloadable-links" href="/static/files/RMI_Report_2020_Company_Fatalities.xlsx" download>Summary file</a>
                  </div>
                </div>
                <div label="Mine Sites">
                  <div className="row mb-4 text-white">
                    <a className="downloadable-links" href="/static/files/RMI_Report_2020_Mines_Sites.xlsx" download>Summary file</a>
                  </div>
                </div>
                <div label="Shareholders">
                  <div className="row mb-4 text-white">
                    <a className="downloadable-links" href="/static/files/RMI_Report_2020-All_Shareholders_20191031.xlsx" download>Summary file</a>
                  </div>
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
