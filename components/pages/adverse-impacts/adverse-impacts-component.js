import React, { PureComponent } from 'react';

import AdverseImpactsFilters from './adverse-impacts-filters';
import AdverseImpactsTable from './adverse-impacts-table';

class AdverseImpacts extends PureComponent {
  render() {
    return (
      <div className="c-adverse-impacts-page">
        <div className="page-intro">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12 col-lg-5">
                <h2 className="title">Adverse Impacts</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="page-content">
          <section className="section -gray">
            <div className="l-layout">
              <div className="row">
                <div className="col-xs-12">
                  <AdverseImpactsFilters />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <AdverseImpactsTable />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default AdverseImpacts;
