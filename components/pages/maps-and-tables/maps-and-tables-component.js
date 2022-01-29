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
              <div className="col-xs-12 col-md-5">
                <h2 className="title">Maps and Tables</h2>
              </div>
              <div className="col-xs-12 col-md-7">
                <p>
                  These maps and tables are based on public domain information and any additional data providedby the assessed companies.
                  They provide contextual data on the 40 assessed companies and their 1,000 mine sites, as complementary information to the results of the assessment.
                  Click on the categories below to view the data.
                  It is possible to download the datasets as spreadsheets or as CSV files.
                </p>
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
                <div label="Stock Exchanges (primary listings)">
                  <MapStockExchanges />
                </div>
                <div label="Fatality Reports">
                  <div className="row mb-2 text-white">
                    <span style={{ fontSize: '20px' }}>Download data :</span>
                  </div>
                  <div className="row mb-2 text-white">
                    <a className="downloadable-links" href="/static/files/RMI_Report_2020_Company_Fatalities.xlsx" download>RMI_Report_2020_Company_Fatalities</a>
                  </div>
                  <div className="row mb-2 text-white">
                    <a className="downloadable-links" href="/static/files/RMI_Report_2020_Raw_Data_Fatalities.csv" download>RMI_Report_2020_Raw_Data_Fatalities</a>
                  </div>
                </div>
                <div label="Mine Sites">
                  <div className="row mb-2 text-white">
                    <span style={{ fontSize: '20px' }}>Download data :</span>
                  </div>
                  <div className="row mb-2 text-white">
                    <a className="downloadable-links" href="/static/files/RMI_Report_2020_Mines_Sites.xlsx" download>RMI_Report_2020_Mines_Sites</a>
                  </div>
                  <div className="row mb-2 text-white">
                    <a className="downloadable-links" href="/static/files/RMI_Report_2020_Raw_Data_Mines_Sites.csv" download>RMI_Report_2020_Raw_Data_Mines_Sites</a>
                  </div>
                </div>
              </MapsAndTablesAccordion>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MapsAndTables;
