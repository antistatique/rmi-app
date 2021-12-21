import React, { PureComponent } from 'react';

// components
import LibraryFilters from './library-filters';
import LibraryTable from './library-table';

// styles
import styles from './library-styles.scss';

class Library extends PureComponent {
  render() {
    return (
      <div className="c-library-page">
        <style jsx>{styles}</style>
        <div className="page-intro">
          <div className="l-layout">
            <div className="row">
              <div className="col-xs-12 col-md-5">
                <h2 className="title">Document Library</h2>
              </div>
              <div className="col-xs-12 col-md-7">
                <p>
                  This searchable document library includes approximately 3,800 source documents, which have been reviewed during the assessment of the 38 companies and 180 selected mine sites. This library contains documents up to mid-2019, the assessment period of the RMI Report 2022.
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
                  <LibraryFilters />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <LibraryTable />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Library;
