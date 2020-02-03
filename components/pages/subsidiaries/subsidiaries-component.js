import React, { PureComponent } from 'react';

// components
import SubsidiariesFilters from './subsidiaries-filters';
import SubsidiariesTable from './subsidiaries-table';

class Subsidiaries extends PureComponent {
  render() {
    return (
      <div className="c-subsidiaries-page">
        <div className="page-intro">
          <div className="l-layout">
            <div className="row">
              <div className="col-md-6">
                <h2 className="title">Company subsidiaries</h2>
              </div>
              <div className="col-md-6">
                <p>
                  This searchable database contains all the known subsidiaries of the 38 companies assessed in the RMI Report 2020. It includes over 3,000 entities, showing their country of registration and controlling company.
                  It is possible to search for a specific text in the titles and to filter by company, using the fields below.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="page-content">
          <section className="section -gray">
            <div className="l-layout">
              <div className="row">
                <div className="col-xs-12">
                  <SubsidiariesFilters />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <SubsidiariesTable />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Subsidiaries;
