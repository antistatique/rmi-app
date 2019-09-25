import React, { PureComponent } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from 'react-accessible-accordion';

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
          <div className="l-layout">
            <Accordion accordion={false}>
              <AccordionItem expanded={false}>
                <AccordionItemTitle>
                  <h3 className="accordion-name">Producing Countries</h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <MapProducingCountries />
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem expanded={false}>
                <AccordionItemTitle>
                  <h3 className="accordion-name">Known Tax Jurisdictions</h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <MapTaxJurisdictions />
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem expanded={false}>
                <AccordionItemTitle>
                  <h3 className="accordion-name">Stock Exchanges</h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <MapStockExchanges />
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem expanded={false}>
                <AccordionItemTitle>
                  <h3 className="accordion-name">Tailings Storage Facilities</h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <MapTailingStorageFacilities />
                </AccordionItemBody>
              </AccordionItem>
              <AccordionItem expanded={false}>
                <AccordionItemTitle>
                  <h3 className="accordion-name">Fatality Reports</h3>
                </AccordionItemTitle>
                <AccordionItemBody>
                  <TableFatalityReports />
                </AccordionItemBody>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    )
  }
}

export default MapsAndTables;
