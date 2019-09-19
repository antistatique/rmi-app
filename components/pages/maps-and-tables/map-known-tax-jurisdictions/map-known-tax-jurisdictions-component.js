import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Map from 'components/common/map';
import { getCompanyCountryColor } from '../../companies/companies-helpers';

import Filters from './map-known-tax-jurisdications-filters';

class MapTaxJurisdictions extends PureComponent {
  static propTypes = { paths: PropTypes.array.isRequired }

  static setCountryColor = geographyProperties => getCompanyCountryColor(geographyProperties);
  render() {
    return (
      <div className="c-map-tax-jurisdictions">
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
              <div className="row">
                <div className="col-12">
                  <Map
                    paths={this.props.paths}
                    center={[40, 10]}
                    setCountryColor={MapTaxJurisdictions.setCountryColor}
                    legend={[]}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <Filters />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MapTaxJurisdictions;
